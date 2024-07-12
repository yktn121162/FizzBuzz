

// これにエレメントを渡すと選択状態を切り替えることができる
function flipSelect(e) {
	// 選択状態かをclassList.containsで確認する
	if (e.classList.contains('selected')) {
		// 選択状態なら'selected'をクラスリストから削除
		e.classList.remove('selected');
	} else {
		// 選択状態でないなら'selected'をクラスリストへ追加
		e.classList.add('selected');
	}
}


function GameStart() {
	// スタートボタンを隠す
	document.getElementById('startbutton').hidden = true;

	//初期化
	initialize();


	// プレイエリアとデッキリストエリアを見せる
	// コンティニューを見据えると、これをやる前に各種初期化が必要
	document.getElementById('playarea').hidden = false;
	document.getElementById('decklistarea').hidden = false;
}

function getPickList() {
	let pickList = [];

	pickList.push([document.getElementById('hand01').textContent,document.getElementById('hand01').classList.contains("selected")]);
	pickList.push([document.getElementById('hand02').textContent,document.getElementById('hand02').classList.contains("selected")]);
	pickList.push([document.getElementById('hand03').textContent,document.getElementById('hand03').classList.contains("selected")]);
	pickList.push([document.getElementById('hand04').textContent,document.getElementById('hand04').classList.contains("selected")]);
	pickList.push([document.getElementById('hand05').textContent,document.getElementById('hand05').classList.contains("selected")]);

	return pickList;
}

function getRandomNum() {
	return Math.floor(Math.random() * 100) + 1;
}

function initialize() {
	document.getElementById('number').textContent = getRandomNum();
}


function judge(){
	let number = document.getElementById("number").textContent;
	let pickList = getPickList();
	let card;
	let isPick;

	let score = 0;

	for(let element of pickList){
		card = element[0];
		isPick = element[1];

		switch(card){
			case "FIZZ":
				if(isPick && isFIZZ(number)) score++;
				break;
			case "BUZZ":
				if(isPick && isBUZZ(number)) score++;
				break;
		}

	}


	alert(score);
}





//数字を判定する関数たち
function isFIZZ(number) {
	return (number % 3 === 0);
}

function isBUZZ(number) {
	return (number % 5 === 0);
}

function isFIZZBUZZ(number) {
	return (number % 15 === 0);
}

function isPrime(number) {

	//1は素数でない
	if (number === 1) return false;
	//2は素数
	if (number === 2) return true;
	//偶数はfalse
	if (number % 2 === 0) return false;
	//奇数で割り切れるならfalse
	for (let i = 3; i < number; i = i + 2) {
		if (number % i === 0) return false;
	}
	return true;
}

function isSeven(number) {
	return (number % 7 === 0);
}

function isEleven(number) {
	return (number % 11 === 0);
}

function isJason(number) {
	return (number % 13 === 0); e;
}

function isGauss(number) {
	return (number % 17 === 0);
}

function isOdd(number) {
	return (number % 2 === 1);
}

function isEven(number) {
	return (number % 2 === 0);
}

function isPerfect(number) {
	//少なすぎるので一旦直書きで
	if (number === 6 || number === 28 || number === 496 || number === 8128) {
		return true;
	} else {
		return false;
	}
}

function isSquare(number) {
	//誤差を想定していない
	return Number.isInteger(Math.sqrt(number));
}

function isCubic(number) {
	//誤差を想定していない
	return Number.isInteger(Math.cbrt(number));
}