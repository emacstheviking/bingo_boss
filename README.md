bingo_boss
==========

Simple ChicagoBoss / Angular JS talking (OSX only) bingo caller web app for learning purposes.

# Requirements -- a Mac!

I wrote it on my iMac and it uses the OS command "say" to make the ball number and ball phrase be heard to the players. If you are on Linux or Windows then I suggest that you first install a text-to-speech system and then modify the relevant file to invoke the relevant sub-system on your hardware.

It will run on any platform that runs Erlang of course but you won't get speech on anything other that OS X.

I *might* try to do this for Linux (Ubuntu) sometime soon out of technical curiosity as I've played with several Linux speech systems including Festival so it is possible.

Every New Year in our house we have a mad Bingo game where the prizes are complete rubbish and this year, as I was working my way through CB tutorial it suddenly dawned on me what an ideal opportunity this was to sharpen my AngularJS skills as well as learn about CB. So there you go.


# Installation

This requires MongoDB be up and running on your machine as that is used to store an imported CSV file that contains the phrases that are spoken during the game. Not all numbers have phrases, in which case only the number is heard. So, first make sure you have a working MongoDB installation before running it.

Once MongoDB is up, you will need to import the CSV like this, first go into the "/model" folder:

    mongoimport -d bingo -c bingo_balls --type csv --file standard-calls.csv --headerline

This ensures there are at least the standard set of spoken ball phrases ready for running the game.


# Running

Open a console window and run with:

    ./init-dev.sh

For some reason it doesn't run despite doing a `./rebar compile` before `./init.sh start` but I didn't care about that then and I don't care about it now. It was moaning about routes not being found or something. Whatever. I will sort that out on my next CB project, already under way.

# Playing Bingo

The game is a stripped bare Bootstrap3 SPA thing. Click the "New Game" button and you are ready to go! Refreshing the page will also wipe the current game in progress so be careful!

Clicking the "Call" button makes an API call that supplies the ball number, this in turn causes the server to find a matching MongoDB record for that number and if one is found, the text is spoken as well. 

The "Auto Play" start and stop means nobody needs to miss out on the fun of being in the game. There is a delay of five seconds between calls.

# Bugs

Clicking a ball was supposed to make it call its number but somehow I goofed. Good job we didn't need to do it. I think it is calling the internal index number instead of the contents or something stupid. Whatever. All over now.

# Improvements

I *might* modify it to use `boss_mq` to serialise the calling process. This will make the client code simpler in that it doesn't need to worry about overlapping speech issues as the server will play them out serially. I think I should do that just to learn to use boss_mq a little better. I've used RabbitMQ a lot, in fact I've used Erlang on and off for about eight years but wanted to learn CB.

# Conclusion

I have probably missed some detilas but playing it was absolutely hilarious, although booze helped I am sure. The kids loved it. We played eleven games (they made us play) straight until 11:30PM and then we stopped and enjoyed the BBC coverage of Queen (the band) until Midnight. A great end to the year.

Happy New Year to everybody, hope you find it useful on some level or other.
