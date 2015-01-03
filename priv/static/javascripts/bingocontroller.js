angular.module('bingo')
.controller('BingoController', ['$scope', '$http', '$interval',
	function ($scope, $http, $interval)
	{
		var label_AP_START = 'Start Auto-Play';
		var label_AP_STOP  = 'Stop Auto-Play';
		var autoPlayTimer  = undefined;
		var autoPlay       = 0;
		var bingoApi       = 'http://localhost:8001/bingo/'; 
		var bingoCall      = bingoApi + 'call/';
		var bingoSpeak     = bingoApi + 'speak/';
		var autoSpeak      = 20;
		var numbers        = [];

		$scope.inProgress    = 0;
		$scope.remaining     = '';
		$scope.called        = '';
		$scope.lastNumber    = '';
		$scope.ballIndex     = 0;
		$scope.autoPlayLabel = label_AP_START;

		/**
		 * Prepares a new game.
		 *
		 * We set the current number to a smiley until one is
		 * called. The number list is initialised and we reset
		 * the display statistics ($apply will do this for us).
		 */
		$scope.newGame = function()
		{
			numbers = $scope.shuffledNumbers();

			$scope.currentNumber = ":)";
			$scope.calledNumbers = [];
			$scope.remaining = numbers.length;
		};

		/**
		 * Auto-play! Now the caller can play as well.
		 *
		 * This feature shows how to use the $interval service
		 * for timed, repeated event management in AngularJS.
		 */
		$scope.toggleAutoGame = function()
		{
			autoPlay = 1 - autoPlay;

			if (1 == autoPlay) {

				$scope.autoPlayLabel = label_AP_STOP;

			    autoPlayTimer = $interval(
			    	function() {
			    		$scope.nextNumber();
			    	}, 5000);
			}
			else {
				$scope.autoPlayLabel = label_AP_START;

          		if (angular.isDefined(autoPlayTimer)) {
            		$interval.cancel(autoPlayTimer);
            		autoPlayTimer = undefined;
		        }
			}
		};

		/**
		 * Say something silly after a certain number of calls.
		 *
		 * In our household it is customary to mention "sweating" a bit as
		 * the tension mounts during the game.
		 */
		$scope.autoSpeakUpdate = function()
		{
			if (--autoSpeak <= 0) {
				autoSpeak = 7;
				var text = _.sample([
					"I'm a bit sweaty, don't know about you!",
					"Anybody starting to sweat yet?",
					"I'm sweating, open a window!"
					]);
				$http
					.post(bingoSpeak, text)
					.success(function(){
						$scope.inProgress = 0;
					});
			}
			else {
				$scope.inProgress = 0;
			}
		};

		/**
		 * Handles displaying the next number to be called.
		 *
		 * The next number from the list is read, the value is
		 * sent via a GET request to ber verbalised and finally
		 * we see if it's time to start syaing random silly 
		 * things if more than a certain number of balls are played.
		 */
		$scope.nextNumber = function()
		{
			if ($scope.ballIndex < numbers.length)
			{
				$scope.inProgress = 1;

				var ballNumber = numbers[$scope.ballIndex];
				$scope.buttonCall($scope.ballIndex);

				$scope.currentNumber = ballNumber;
				$scope.lastNumber = ballNumber;
				$scope.ballIndex++;

				$scope.calledNumbers.push(ballNumber);
				$scope.remaining--;
			}
		};

		/**
		 * Call out the value of a ball button when clicked.
		 */
		$scope.buttonCall = function(ballIndex)	{
			$http
				.get(bingoCall + numbers[ballIndex])
				.success(function() {
					console.log("NUMBER DONE");
					$scope.autoSpeakUpdate();
				});
		};

		/**
		 * Returns an array of the numbers 1-90 shuffled.
		 * Behold the glory that is underscore.js!   ;)
		 */
		$scope.shuffledNumbers = function()	{
			return _.chain(_.times(90, function(n){return n+1;}))
				.shuffle()
				.value();
		};
	}]);

