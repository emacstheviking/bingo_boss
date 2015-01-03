-module(bingo_ball, [Id, Number, Phrase]).
-compile(export_all).

%% For a standard set of spoken phrases:
%%
%%  $ mongoimport -d bingo -c bingo_balls --type csv --file standard-calls.csv --headerline
%%
%% You can of course create more entertaining phrases into another CSV file!
