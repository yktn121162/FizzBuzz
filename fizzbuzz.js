let deck = new Deck();
let maxQuestionNum = 100;
let maxHand = 5;

let startTime = Date.now();
const initialLimitTime = 10;
let limitTime = initialLimitTime;
let timeoutID = null;


//大きい数字のためのクラス
class QuestionNum{
	maxNumber;
	number;
	color;
	line;
	font;
	
	constructor(){
		this.initialize(100);
	}

	
	initialize(n){
		this.maxNumber = n;
		this.setQuestion();
	}
	
	setQuestion(){
		this.setNumber(this.maxNumber);
		this.setColor();
		this.setLine();
		this.setFont();
	}
	
	nextQuestion(){
		this.setQuestion();
	}

	setNumber(n){
		//1~nの範囲で生成
		this.number = Math.floor(Math.random() * n) + 1;
	}

	setColor(){
		let tmp =  Math.floor(Math.random() * (3 + 1));
		switch(tmp){
			case 0:
				this.color = 'red';
				break;
			case 1:
				this.color = 'blue';
				break;
			case 2:
				this.color = 'green';
				break;
			case 3:
				this.color = null;
				break;	
		}
	}

	setLine(){
		let tmp =  Math.floor(Math.random() * (3 + 1));
		switch(tmp){
			case 0:
				this.line = 'underline';
				break;
			case 1:
				this.line = 'line-through';
				break;
			case 2:
				this.line = 'overline';
				break;
			case 3:
				this.line = null;
				break;
		}
	}

	setFont(){
		let tmp =  Math.floor(Math.random() * (2 + 1));
		switch(tmp){
			case 0:
				this.font = 'italic';
				break;
			case 1:
				this.font = 'bold';
				break;
			case 2:
				this.font = null;
				break;
		}
	}
}

class card{
	type;
	label;
	no;
	rarity;
	cardtext;
	ratetext;
	isUsed;
	isMiss;
}

// Ascend結果
class ascendResult{
	questionNum;
	cardList;
	ansTimeS;
	timeReduce;
	limitTime;
	score;
	scoreText;
	
	constructor(){
		this.questionNum = new QuestionNum();
		this.limitTime = limitTime;
		this.ansTimeS = 0;
		this.timeReduce = 0;
		this.score = 0;
		this.scoreText = "-";
	}
	
	addScoreText(text){
		this.scoreText = this.scoreText + text;
	}
	
	getScore() {
		this.score = questionNum.number;
		this.scoreText = 'Base' + '(' + this.score + ')';

		setMistake(this.cardList);

		// そのうち固定じゃなくなる
		let maxHand = 5;


		let FIZZflag = false;
		let BUZZflag = false;
		let SevenFlag = false;
		let ElevenFlag = false;
		let PerfectFlag = false;

		//それぞれのカード種類の正解数のカウント
		let usedFIZZ = 0;
		let usedBUZZ = 0;
		let used7 = 0;
		let used11 = 0;
		let used13 = 0;
		let used17 = 0;
		let usedODD = 0;
		let usedEVEN = 0;
		let usedPRIME = 0;
		let usedPERFECT = 0;
		let usedSQ = 0;
		let usedCUBIC = 0;
		let usedRED = 0;
		let usedGREEN = 0;
		let usedBLUE = 0;
		let usedYELLOW = 0;
		let usedCYAN = 0;
		let usedMAGENTA = 0;
		let usedITALIC = 0;
		let usedBOLD = 0;
		let usedUNDERLINE = 0;
		let usedLINETHROUGH = 0;
		let usedOVERLINE = 0;
		let usedHAMBURGER = 0;

		let missValue = 0;


		let usedCardValue = 0;

		for (const c of this.cardList) {

			if (c.isUsed && !c.isMiss) {
				switch (c.type) {
					case `FIZZ`:
						usedFIZZ++;
						break;
					case `BUZZ`:
						usedBUZZ++;
						break;
					case `7`:
						used7++;
						break;
					case `11`:
						used11++;
						break;
					case `13`:
						used13++;
						break;
					case `17`:
						used17++;
						break;
					case `odd`:
						usedODD++;
						break;
					case `even`:
						usedEVEN++;
						break;
					case `prime`:
						usedPRIME++;
						break;
					case `perfect`:
						usedPERFECT++;
						break;
					case `sq`:
						usedSQ++;
						break;
					case `cubic`:
						usedCUBIC++;
						break;
					case `red`:
						usedRED++;
						break;
					case `green`:
						usedGREEN++;
						break;
					case `blue`:
						usedBLUE++;
						break;
					case `yellow`:
						usedYELLOW++;
						break;
					case `cyan`:
						usedCYAN++;
						break;
					case `magenta`:
						usedMAGENTA++;
						break;
					case `italic`:
						usedITALIC++;
						break;
					case `bold`:
						usedBOLD++;
						break;
					case `underline`:
						usedUNDERLINE++;
						break;
					case `line-through`:
						usedLINETHROUGH++;
						break;
					case `overline`:
						usedOVERLINE++;
						break;
					case `hamburger`:
						usedHAMBURGER++;
						break;
				}
			}

			if (c.isUsed) {
				missValue++;
			}

			if (c.isMiss) {
				usedCardValue++;
			}
		}

		//スコアの計算
		let addText;
		if (usedFIZZ > 0) {
			FIZZflag = true;
			this.score = this.score * (3 + (usedFIZZ - 1) * 0.1);
			addText = '* FIZZ(' +  (3 + (usedFIZZ -1) * 0.1) +')';
			this.addScoreText(addText);
		}
		if (usedBUZZ >  0) {
			BUZZflag = true;
			this.score = this.score * (5 + (usedBUZZ - 1) * 0.1);
			addText = '* BUZZ(' +  (5 + (usedBUZZ -1) * 0.1) +')';
			this.addScoreText(addText);
		}
		if (used7 > 0) {
			SevenFlag = true;
			this.score = this.score * (7 + (used7 - 1) * 0.1);
			addText = '* Seven(' +  (7 + (used7 -1) * 0.1) +')';
			this.addScoreText(addText);
		}
		if (used11 > 0) {
			ElevenFlag = true;
			this.score = this.score * (11 + (used11 - 1) * 0.1);
			addText = '* Eleven(' +  (11 + (used11 -1) * 0.1) +')';
			this.addScoreText(addText);
		}
		if (used13 > 0) {
			this.score = this.score * (13 + (used13 - 1) * 0.1);
			addText = '* Jason(' +  (13 + (used13 -1) * 0.1) +')';
			this.addScoreText(addText);
		}
		if (used17 > 0) {
			this.score = this.score * (17 + (used17- 1) * 0.1);
			addText = '* Gauss(' +  (17 + (used17 -1) * 0.1) +')';
			this.addScoreText(addText);
		}
		if (usedODD > 0) {
			this.score = this.score * (2 + (usedODD - 1) * 0.1);
			addText = '* Even(' +  (2 + (usedODD -1) * 0.1) +')';
			this.addScoreText(addText);
		}
		if (usedEVEN > 0) {
			this.score = this.score * (2 + (usedEVEN - 1) * 0.1);
			addText = '* Even(' +  (2 + (usedEVEN -1) * 0.1) +')';
			this.addScoreText(addText);
		}
		if (usedPRIME > 0) {
			this.score = this.score * (getMaxPrime(maxNum) + (usedPRIME - 1) * 0.1);
			addText = '* Prime(' +  (getMaxPrime(maxNum) + (usedPRIME -1) * 0.1) +')';
			this.addScoreText(addText);
		}
		if (usedPERFECT > 0) {
			PerfectFlag = true;
			this.score = this.score * (questionNum.number + (usedPERFECT - 1) * 0.1);
			addText = '* Perfect(' +  (questionNum.number + (usedPERFECT -1) * 0.1) +')';
			this.addScoreText(addText);
		}
		if (usedSQ > 0) {
			this.score = this.score * (16 + (usedSQ - 1) * 0.1);
			addText = '* Square(' +  (16 + (usedSQ -1) * 0.1) +')';
			this.addScoreText(addText);
		}
		if (usedCUBIC > 0) {
			score = score * (216 + (usedCUBIC - 1) * 0.1);
			addText = '* Cubic(' +  (216 + (usedCUBIC -1) * 0.1) +')';
			this.addScoreText(addText);
		}
		if (usedRED > 0) {
			this.score = this.score * (2 + (usedRED - 1) * 0.1);
			addText = '* Red(' +  (2 + (usedRED -1) * 0.1) +')';
			this.addScoreText(addText);
		}
		if (usedGREEN > 0) {
			this.score = this.score * (2 + (usedGREEN - 1) * 0.1);
			addText = '* Green(' +  (2 + (usedGREEN -1) * 0.1) +')';
			this.addScoreText(addText);
		}
		if (usedBLUE > 0) {
			this.score = this.score * (2 + (usedBLUE - 1) * 0.1);
			addText = '* Blue(' +  (2 + (usedBLUE -1) * 0.1) +')';
			this.addScoreText(addText);
		}
		if (usedYELLOW > 0) {
			this.score = this.score * (2 + (usedYELLOW - 1) * 0.1);
			addText = '* Yellow(' +  (2 + (usedYELLOW -1) * 0.1) +')';
			this.addScoreText(addText);
		}
		if (usedCYAN > 0) {
			this.score = this.score * (2 + (usedCYAN - 1) * 0.1);
			addText = '* Cyan(' +  (2 + (usedCYAN -1) * 0.1) +')';
			this.addScoreText(addText);
		}
		if (usedMAGENTA > 0) {
			this.score = this.score * (2 + (usedMAGENTA - 1) * 0.1);
			addText = '* Magenta(' +  (2 + (usedMAGENTA -1) * 0.1) +')';
			this.addScoreText(addText);
		}
		if (usedITALIC > 0) {
			this.score = this.score * (2 + (usedITALIC - 1) * 0.1);
			addText = '* Italic(' +  (2 + (usedITALIC -1) * 0.1) +')';
			this.addScoreText(addText);
		}
		if (usedBOLD > 0) {
			score = score * (2 + (usedBOLD - 1) * 0.1);
	        addText = '* Bold(' +  (2 + (usedBOLD -1) * 0.1) +')';
			this.addScoreText(addText);
		}
		if (usedUNDERLINE > 0) {
			this.score = this.score * (2 + (usedUNDERLINE - 1) * 0.1);
			addText = '* UnderLine(' +  (2 + (usedUNDERLINE -1) * 0.1) +')';
			this.addScoreText(addText);
		}
		if (usedLINETHROUGH > 0) {
			this.score = this.score * (2 + (usedLINETHROUGH - 1) * 0.1);
			addText = '* LineThrough(' +  (2 + (usedLINETHROUGH -1) * 0.1) +')';
			this.addScoreText(addText);
		}
		if (usedOVERLINE > 0) {
			this.score = this.score * (2 + (usedOVERLINE - 1) * 0.1);
			addText = '* OverLine(' +  (2 + (usedOVERLINE -1) * 0.1) +')';
			this.addScoreText(addText);
		}
		if (usedHAMBURGER > 0) {
			this.score = this.score * (2 + (usedHAMBURGER - 1) * 0.1);
			addText = '* Hamburger!(' +  (2 + (usedHAMBURGER -1) * 0.1) +')';
			this.addScoreText(addText);
		}

		//複合の判定
		if (FIZZflag && BUZZflag) {
			this.score = this.score * 15;
			addText = '* FIZZBUZZ!(15)';
			this.addScoreText(addText);
		}

		if (SevenFlag && ElevenFlag) {
			this.score = this.score * 711;
			addText = '* SEVENELEVEN!(15)';
			this.addScoreText(addText);
		}

		//全使用の判定
		if (maxHand == usedCardValue) {
			if (missValue <= 0) {
				if (PerfectFlag) {
					this.score = this.score ** 3;
					addText = 'PERFECTNUMBER!(^2)';
					scoreText = '( ' + scoreText + ' )' + addText;
				} else {
					this.score = this.score * 2;
					addText = '* PERFECT!(2)';
					this.addScoreText(addText);
				}
			}
		}

		//残り時間補正の計算
		if (missValue <= 0) {
			if (this.ansTimeS === 0) {
				return score;
			} else {
				this.timeReduce = Math.max(initialLimitTime - this.limitTime, 0);
				if(this.timeReduce > 0) {
					this.score = this.score * (1 + this.ansTimeS + this.timeReduce * 2);
					addText = '* Time Bonus!(' + (1 + this.ansTimeS + this.timeReduce*2 ) + ')';
					this.addScoreText(addText);
					return this.score;
				} else {
					this.score = this.score * (1 + this.ansTimeS);
					addText = '* Time Bonus!(' + (1 + this.ansTimeS) + ')';
					this.addScoreText(addText);
					return this.score;
				}
			}
		}
		return this.score;
	}
}

//let questionNum = new QuestionNum();
let questionNum;
let resultList;

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

// 残り時間のテキストを生成
function genTime(diff) {
	if( diff > 0 ){
		const calcSec = Math.floor(diff / 1000) % 60;
		const calcMSec = diff % 1000;

		const s = String(calcSec).padStart(2, '0');
		const ms = String(calcMSec).padStart(3, '0');

		const timeText = `Time 00:${s}.${ms}`;

		return timeText;
	} else {
		const timeText = `Time 00:00.000`;

		return timeText;
	}
}

// 残り時間を計算
function CalcDiff() {
	let targetTime = new Date( startTime );
	targetTime.setSeconds( targetTime.getSeconds() + limitTime );
	const now = new Date();
	const diff = targetTime.getTime() - now.getTime();

	return diff;
}

// 時間表示のテキストを設定
function arrangeTimeElement(elem) {
	elem.innerText = genTime(CalcDiff());
}

// 制限時間の表示制御
function displayTime() {
	const timeElm = document.getElementById('timer');
	if(timeElm != null) {
		arrangeTimeElement(timeElm);

		// 制限時間を使い切っていたら回答チェックへ
		const diff = CalcDiff();
		if( diff <= 0 ) {
			judge();

			return;
		}
	}
	// 10ミリ秒後に自身を呼び出すタイマーをセット
	timeoutID = setTimeout(displayTime, 10);
}

// スコア表示のテキストを設定
function arrangeScoreElement(elem, score) {
	elem.innerText = score;
}

// スコア詳細表示のテキストを設定
function arrangeScoreTextElement(elem, scoreText) {
	elem.innerText = scoreText;
}

// スコア表示制御
function displayScore(targetResult) {
	const scoreElm = document.getElementById('score');
	
	if(scoreElm != null) {
		arrangeScoreElement(scoreElm, targetResult.score);
	}
	
	const scoreTextElm = document.getElementById('scoreText');
	
	if(scoreTextElm != null) {
		arrangeScoreTextElement(scoreTextElm, targetResult.scoreText);
	}
}


function GameStart() {
	// スタートボタンを隠す
	document.getElementById('startbutton').hidden = true;

	//初期化
	initialize(maxQuestionNum); // 初期値100


	// プレイエリアとデッキリストエリアを見せる
	// コンティニューを見据えると、これをやる前に各種初期化が必要
	document.getElementById('playarea').hidden = false;
	document.getElementById('decklistarea').hidden = false;
	
	// Nextボタンを隠す
	// インターバル用のエリアを別に作って、プレイエリアを交互に表示すると良い？
	document.getElementById('next-button').hidden = true;
}

function getPickList() {
	let pickList = [];

	//後で整えます
	let hand1 = new card();
	let hand2 = new card();
	let hand3 = new card();
	let hand4 = new card();
	let hand5 = new card();

	hand1.type = document.getElementById('hand01').textContent;
	hand2.type = document.getElementById('hand02').textContent;
	hand3.type = document.getElementById('hand03').textContent;
	hand4.type = document.getElementById('hand04').textContent;
	hand5.type = document.getElementById('hand05').textContent;
	
	hand1.isUsed = document.getElementById('hand01').classList.contains("selected");
	hand2.isUsed = document.getElementById('hand02').classList.contains("selected");
	hand3.isUsed = document.getElementById('hand03').classList.contains("selected");
	hand4.isUsed = document.getElementById('hand04').classList.contains("selected");
	hand5.isUsed = document.getElementById('hand05').classList.contains("selected");

	pickList.push(hand1);
	pickList.push(hand2);
	pickList.push(hand3);
	pickList.push(hand4);
	pickList.push(hand5);

	return pickList;
}

function getRandomNum() {
	return Math.floor(Math.random() * 100) + 1;
}

// 手札のエレメントをインデックスから取得する
function getHandElement(n) {
	let ElementName;
	// 01から始めてたわガハハ
	// 後で直すかも
	n++;
	
	// Formatみたいな便利なものがないらしい？　if文で簡単に書けるので良いとする。整数以外が来ることは考えない。
	if(n < 10) {
		ElementName = `hand0${n}`;
	} else {
		ElementName = `hand${n}`;
	}
	// HTMLで用意している範囲を超えるとNULLが返される。どのように必要分を追加するかは宿題
	// このタイミングでNULLチェックをして追加する方法や、最大値を渡してそこまで揃っているか確認するメソッドを別に書くか
	return document.getElementById(ElementName);
}

function dealHand(handElement, hand) {
	// カードラベルを設定
	handElement.textContent = hand.label;
	
	// 選択を解除
	// 選択状態かをclassList.containsで確認する（しなくてもいける？）
	if (handElement.classList.contains('selected')) {
		// 選択状態なら'selected'をクラスリストから削除
		handElement.classList.remove('selected');
	}
}

//nは大きい数字の最大値
function initialize(n) { 
	resultList = [];
	let result1 = new ascendResult();
	resultList.push(new ascendResult());
	
	questionNum = resultList[0].questionNum;
	
	questionNum.initialize(n);
	document.getElementById('number').textContent = questionNum.number;
	
	// デッキから最初の手札を引く
	let handList = deck.deal(maxHand);	// 初期値5
	
	// 表示へ反映する
	for (let i = 0; i < maxHand; i++) {
		let handElement = getHandElement(i);
		let hand = handList[i];
		dealHand(handElement, hand);
	}
	
	// 制限時間カウントを開始
	startTime = Date.now();
	displayTime();
}


function nextQuestion(){
	questionNum = resultList[0].questionNum;
	
	questionNum.nextQuestion();
	document.getElementById('number').textContent = questionNum.number;

	// デッキから次の手札を引く
	let handList = deck.deal(maxHand);
	
	// 表示へ反映する
	for (let i = 0; i < maxHand; i++) {
		let handElement = getHandElement(i);
		let hand = handList[i];
		dealHand(handElement, hand);
	}
	
	// 制限時間をリセット
	startTime = Date.now();
	displayTime();
	
	document.getElementById('next-button').hidden = true;
	document.getElementById('ascend-button').hidden = false;
}

// Ascend!もしくは時間切れで呼ばれる
function judge(){
	clearTimeout(timeoutID);

	resultList[0].cardList = getPickList();

	let ansTime = CalcDiff();
	resultList[0].ansTimeS = +(ansTime/1000).toFixed(1);
	
	resultList[0].limitTime = limitTime;
	
	
	let score = resultList[0].getScore();
	console.log(score);
	displayScore(resultList[0]);
	
	//nextQuestion();
	document.getElementById('next-button').hidden = false;
	document.getElementById('ascend-button').hidden = true;
}





//数字を判定する関数たち
function isFIZZ(number) {
	return (number % 3 === 0);
}

function isBUZZ(number) {
	return (number % 5 === 
		0);
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
	return (number % 13 === 0);
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

//色の判定
const isRed = (color) => {
	return (color === 'red' || color === 'yellow' || color === 'magenta' );
  }
  const isGreen = (color) => {
	return (color === 'green' || color === 'yellow' || color === 'cyan' );
  }
  const isBlue = (color) => {
	return (color === 'blue' || color === 'cyan' || color === 'magenta' );
  }
  const isYellow = (color) => {
	return (color === 'yellow' );
  }
  const isCyan = (color) => {
	return (color === 'cyan' );
  }
  const isMagenta = (color) => {
	return (color === 'magenta' );
  }
  
  
  //フォントの判定
  const isItalic = (font) => {
	return (font === 'italic' || font ==='italic_bold');
  }
  const isBold = (font) => {
	return (font === 'bold' || font ==='italic_bold');
  }
  
  //装飾線の判定
  const isUnderLine = (line) => {
	return (line.includes('underline'));
  }
  const isLineThrough = (line) => {
	return (line.includes('line-through'));
  }
  const isOverLine = (line) => {
	return (line.includes('overline'));
  }
  const isHamburger = (line) => {
	return (isUnderLine(line) || isLineThrough(line) || isOverLine(line));
  }
  
  const xor = (a, b) => {
	return (a && !b) || (!a && b);
}

function setMistake(cardList) {
	let mistake = 0;
	for(const card of cardList) {
		  switch(card.type) {
			  case `FIZZ`:
				card.isMiss = xor( card.isUsed, isFIZZ(questionNum.number));
				break;
			  case `BUZZ`:
				card.isMiss = xor( card.isUsed, isBUZZ(questionNum.number));
				break;
			  case `7`:
				card.isMiss = xor( card.isUsed, isSeven(questionNum.number));
				break;
			  case `11`:
				card.isMiss = xor( card.isUsed, isEleven(questionNum.number));
				break;
			  case `13`:
				card.isMiss = xor( card.isUsed, isJason(questionNum.number));
				break;
			  case `17`:
				card.isMiss = xor( card.isUsed, isGauss(questionNum.number));
				break;
			  case `odd`:
				card.isMiss = xor( card.isUsed, isOdd(questionNum.number));
				break;
			  case `even`:
				card.isMiss = xor( card.isUsed, isEven(questionNum.number));
				break;
			  case `prime`:
				card.isMiss = xor( card.isUsed, isPrime(questionNum.number));
				break;
			  case `perfect`:
				card.isMiss = xor( card.isUsed, isPerfect(questionNum.number));
				break;
			  case `sq`:
				card.isMiss = xor( card.isUsed, isSquare(questionNum.number));
				break;
			  case `cubic`:
				card.isMiss = xor( card.isUsed, isCubic(questionNum.number));
				break;
			  case `red`:
				card.isMiss = xor( card.isUsed, isRed(questionNum.color));
				break;
			  case `green`:
				card.isMiss = xor( card.isUsed, isGreen(questionNum.color));
				break;
			  case `blue`:
				card.isMiss = xor( card.isUsed, isBlue(questionNum.color));
				break;
			  case `yellow`:
				card.isMiss = xor( card.isUsed, isRed(questionNum.color) || isGreen(questionNum.color));
				break;
			  case `cyan`:
				card.isMiss = xor( card.isUsed, isBlue(questionNum.color) || isGreen(questionNum.color));
				break;
			  case `magenta`:
				card.isMiss = xor( card.isUsed, isBlue(questionNum.color) || isRed(questionNum.color));
				break;
			  case `italic`:
				card.isMiss = xor( card.isUsed, isItalic(questionNum.font));
				break;
		      case `bold`:
				card.isMiss = xor( card.isUsed, isBold(questionNum.font));
				break;
		  	  case `underline`:
				card.isMiss = xor( card.isUsed, isUnderLine(questionNum.line));
				break;
		  	  case `line-through`:
				card.isMiss = xor( card.isUsed, isLineThrough(questionNum.line));
				break;
		  	  case `overline`:
			  	card.isMiss = xor( card.isUsed, isOverLine(questionNum.line));
			  	break;
		  	  case `hamburger`:
			  	card.isMiss = xor( card.isUsed, isHamburger(questionNum.line));
			  	break;
		  }
		  
		  if(card.isMiss) {
		  mistake++;
		  }
	} 
	
	return mistake;
  }

function getScore(cardList, time) {
	let score = questionNum.number;
	let scoreText = 'Base' + '(' + score + ')';

	setMistake(cardList);

	let maxHand = 5;


	let FIZZflag = false;
	let BUZZflag = false;
	let SevenFlag = false;
	let ElevenFlag = false;
	let PerfectFlag = false;

	//それぞれのカード種類の正解数のカウント
	let usedFIZZ = 0;
	let usedBUZZ = 0;
	let used7 = 0;
	let used11 = 0;
	let used13 = 0;
	let used17 = 0;
	let usedODD = 0;
	let usedEVEN = 0;
	let usedPRIME = 0;
	let usedPERFECT = 0;
	let usedSQ = 0;
	let usedCUBIC = 0;
	let usedRED = 0;
	let usedGREEN = 0;
	let usedBLUE = 0;
	let usedYELLOW = 0;
	let usedCYAN = 0;
	let usedMAGENTA = 0;
	let usedITALIC = 0;
	let usedBOLD = 0;
	let usedUNDERLINE = 0;
	let usedLINETHROUGH = 0;
	let usedOVERLINE = 0;
	let usedHAMBURGER = 0;

	let missValue = 0;


	let usedCardValue = 0;

	for (const c of cardList) {

		if (c.isUsed && !c.isMiss) {
			switch (c.type) {
				case `FIZZ`:
					usedFIZZ++;
					break;
				case `BUZZ`:
					usedBUZZ++;
					break;
				case `7`:
					used7++;
					break;
				case `11`:
					used11++;
					break;
				case `13`:
					used13++;
					break;
				case `17`:
					used17++;
					break;
				case `odd`:
					usedODD++;
					break;
				case `even`:
					usedEVEN++;
					break;
				case `prime`:
					usedPRIME++;
					break;
				case `perfect`:
					usedPERFECT++;
					break;
				case `sq`:
					usedSQ++;
					break;
				case `cubic`:
					usedCUBIC++;
					break;
				case `red`:
					usedRED++;
					break;
				case `green`:
					usedGREEN++;
					break;
				case `blue`:
					usedBLUE++;
					break;
				case `yellow`:
					usedYELLOW++;
					break;
				case `cyan`:
					usedCYAN++;
					break;
				case `magenta`:
					usedMAGENTA++;
					break;
				case `italic`:
					usedITALIC++;
					break;
				case `bold`:
					usedBOLD++;
					break;
				case `underline`:
					usedUNDERLINE++;
					break;
				case `line-through`:
					usedLINETHROUGH++;
					break;
				case `overline`:
					usedOVERLINE++;
					break;
				case `hamburger`:
					usedHAMBURGER++;
					break;
			}
		}

		if (c.isUsed) {
			missValue++;
		}

		if (c.isMiss) {
			usedCardValue++;
		}


	}

	//スコアの計算

	if (usedFIZZ > 0) {
		FIZZflag = true;
		score = score * (3 + (usedFIZZ - 1) * 0.1);
		addText = '* FIZZ(' +  (3 + (usedFIZZ -1) * 0.1) +')';
		scoreText = scoreText + addText;
	}
	if (usedBUZZ >  0) {
		BUZZflag = true;
		score = score * (5 + (usedBUZZ - 1) * 0.1);
		addText = '* BUZZ(' +  (5 + (usedBUZZ -1) * 0.1) +')';
		scoreText = scoreText + addText;
	}
	if (used7 > 0) {
		SevenFlag = true;
		score = score * (7 + (used7 - 1) * 0.1);
        addText = '* Seven(' +  (7 + (used7 -1) * 0.1) +')';
        scoreText = scoreText + addText;
	}
	if (used11 > 0) {
		ElevenFlag = true;
		score = score * (11 + (used11 - 1) * 0.1);
        addText = '* Eleven(' +  (11 + (used11 -1) * 0.1) +')';
        scoreText = scoreText + addText;
	}
	if (used13 > 0) {
		score = score * (13 + (used13 - 1) * 0.1);
        addText = '* Jason(' +  (13 + (used13 -1) * 0.1) +')';
        scoreText = scoreText + addText;
	}
	if (used17 > 0) {
		score = score * (17 + (used17- 1) * 0.1);
        addText = '* Gauss(' +  (17 + (used17 -1) * 0.1) +')';
        scoreText = scoreText + addText;
	}
	if (usedODD > 0) {
		score = score * (2 + (usedODD - 1) * 0.1);
        addText = '* Even(' +  (2 + (usedODD -1) * 0.1) +')';
        scoreText = scoreText + addText;
	}
	if (usedEVEN > 0) {
		score = score * (2 + (usedEVEN - 1) * 0.1);
        addText = '* Even(' +  (2 + (usedEVEN -1) * 0.1) +')';
        scoreText = scoreText + addText;
	}
	if (usedPRIME > 0) {
		score = score * (getMaxPrime(maxNum) + (usedPRIME - 1) * 0.1);
        addText = '* Prime(' +  (getMaxPrime(maxNum) + (usedPRIME -1) * 0.1) +')';
        scoreText = scoreText + addText;
	}
	if (usedPERFECT > 0) {
		PerfectFlag = true;
		score = score * (questionNum.number + (usedPERFECT - 1) * 0.1);
        addText = '* Perfect(' +  (questionNum.number + (usedPERFECT -1) * 0.1) +')';
        scoreText = scoreText + addText;

	}
	if (usedSQ > 0) {
		score = score * (16 + (usedSQ - 1) * 0.1);
        addText = '* Square(' +  (16 + (usedSQ -1) * 0.1) +')';
        scoreText = scoreText + addText;
	}
	if (usedCUBIC > 0) {
		score = score * (216 + (usedCUBIC - 1) * 0.1);
        addText = '* Cubic(' +  (216 + (usedCUBIC -1) * 0.1) +')';
        scoreText = scoreText + addText;
	}
	if (usedRED > 0) {
		score = score * (2 + (usedRED - 1) * 0.1);
        addText = '* Red(' +  (2 + (usedRED -1) * 0.1) +')';
        scoreText = scoreText + addText;
	}
	if (usedGREEN > 0) {
		score = score * (2 + (usedGREEN - 1) * 0.1);
        addText = '* Green(' +  (2 + (usedGREEN -1) * 0.1) +')';
        scoreText = scoreText + addText;
	}
	if (usedBLUE > 0) {
		score = score * (2 + (usedBLUE - 1) * 0.1);
        addText = '* Blue(' +  (2 + (usedBLUE -1) * 0.1) +')';
        scoreText = scoreText + addText;
	}
	if (usedYELLOW > 0) {
		score = score * (2 + (usedYELLOW - 1) * 0.1);
        addText = '* Yellow(' +  (2 + (usedYELLOW -1) * 0.1) +')';
        scoreText = scoreText + addText;
	}
	if (usedCYAN > 0) {
		score = score * (2 + (usedCYAN - 1) * 0.1);
        addText = '* Cyan(' +  (2 + (usedCYAN -1) * 0.1) +')';
        scoreText = scoreText + addText;
	}
	if (usedMAGENTA > 0) {
		score = score * (2 + (usedMAGENTA - 1) * 0.1);
        addText = '* Magenta(' +  (2 + (usedMAGENTA -1) * 0.1) +')';
        scoreText = scoreText + addText;
	}
	if (usedITALIC > 0) {
		score = score * (2 + (usedITALIC - 1) * 0.1);
        addText = '* Italic(' +  (2 + (usedITALIC -1) * 0.1) +')';
        scoreText = scoreText + addText;
	}
	if (usedBOLD > 0) {
		score = score * (2 + (usedBOLD - 1) * 0.1);
        addText = '* Bold(' +  (2 + (usedBOLD -1) * 0.1) +')';
        scoreText = scoreText + addText;
	}
	if (usedUNDERLINE > 0) {
		score = score * (2 + (usedUNDERLINE - 1) * 0.1);
        addText = '* UnderLine(' +  (2 + (usedUNDERLINE -1) * 0.1) +')';
        scoreText = scoreText + addText;
	}
	if (usedLINETHROUGH > 0) {
		score = score * (2 + (usedLINETHROUGH - 1) * 0.1);
        addText = '* LineThrough(' +  (2 + (usedLINETHROUGH -1) * 0.1) +')';
        scoreText = scoreText + addText;
	}
	if (usedOVERLINE > 0) {
		score = score * (2 + (usedOVERLINE - 1) * 0.1);
        addText = '* OverLine(' +  (2 + (usedOVERLINE -1) * 0.1) +')';
        scoreText = scoreText + addText;
	}
	if (usedHAMBURGER > 0) {
		score = score * (2 + (usedHAMBURGER - 1) * 0.1);
        addText = '* Hamburger!(' +  (2 + (usedHAMBURGER -1) * 0.1) +')';
        scoreText = scoreText + addText;
	}







	//複合の判定
	if (FIZZflag && BUZZflag) {
		score = score * 15;
    addText = '* FIZZBUZZ!(15)';
    scoreText = scoreText + addText;
	}

	if (SevenFlag && ElevenFlag) {
		score = score * 711;
    addText = '* SEVENELEVEN!(15)';
    scoreText = scoreText + addText;
	}

	//全使用の判定
	if (maxHand == usedCardValue) {
		if (missValue <= 0) {
			if (PerfectFlag) {
				score = score ** 3;
			} else {
				score = score * 2;
				addText = '* PERFECT!(2)';
				scoreText = scoreText + addText;
			}
		}
	}

	//残り時間補正の計算
	if (missValue <= 0) {
		if (time === 0) {
			return score;
		} else {
			let timeReduce = Math.max(initialLimitTime - limitTime, 0);
			score = score * (1 + time + timeReduce * 2);
			addText = '* Time Bonus!(' + (1 + time + timeReduce*2 ) + ')';
			scoreText = scoreText + addText;
			return score;
		}
	}
	return score;

}
