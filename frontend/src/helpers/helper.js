const helpers = {	
	
	formatDate: function (date) {
		date = new Date(date)
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		var dates = date.getDate();
		var months = date.getMonth() + 1;
		var years = date.getFullYear();
		var ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12;
		hours = hours < 10 ? '0' + hours : hours;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;
		dates = dates < 10 ? '0' + dates : dates;
		months = months < 10 ? '0' + months : months;
		var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
		return dates + "/" + months + "/" + years + " "+strTime;
	},
	getTimestamp: function (date) {
		var datetime = new Date( date ).getTime();
		return datetime;

	},
	getSeconds: function (date) {

		date = new Date(date);
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();


		var calmin = ((hours * 60) + minutes);
		var calseconds = ((calmin * 60) + seconds);		
		return calseconds;

	},
	formatTime: function (date) {
		date = new Date(date)
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		hours = hours < 10 ? '0' + hours : hours;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;
		return hours + ':' + minutes + ':' + seconds;
	}
}

export default helpers;