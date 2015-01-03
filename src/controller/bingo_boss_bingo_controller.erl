-module(bingo_boss_bingo_controller, [Req]).
-compile(export_all).


%% @doc Ensure the SPA launch page is returned.

index('GET', []) -> ok.



%% @doc Speaks a single number plus commentary phase if found.
%%
%% The phrase comes from the record (I am using MongoDB) and the
%% data is in a CSV file in the model directory. See the comments
%% in the bingo_ball record source.

call('GET', [NumberString]) ->

	Number = list_to_integer(NumberString),
	Text = case boss_db:find_first(bingo_ball, [{number, Number}]) of
		{bingo_ball, _, _, Phrase} -> NumberString ++ ". " ++ binary_to_list(Phrase);
		undefined -> NumberString
	end,
	say_it(Text),
    {json, [{phrase, Text}]}.



%% @doc Speaks a given text string from the POST body.
%%
%% This is used in the game to add some humour (!?) after a certain
%% amount of balls have been called and the tension builds.

speak('POST', []) ->
	Body = Req:request_body(),
	Text = binary_to_list(Body),
	say_it(Text),
    {200, []}.



%% @todo: use boss_mq to decouple the speech from the return response
%% so the client is not blocked while the speech is rendered.
%% A perfect use case for a queue.

say_it(Text) ->
    os:cmd("say \"" ++ Text ++ "\"").
