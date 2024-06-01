const xor = (a, b) => {
	return (a && !b) || (!a && b);
}

const cardMst = [
    {type: 'fizz'   , label: 'FIZZ'   , no: '1'  , rarity: 'C', cardtext: '3の倍数', ratetext: 'スコア3倍' },
    {type: 'buzz'   , label: 'BUZZ'   , no: '2'  , rarity: 'C', cardtext: '5の倍数', ratetext: 'スコア5倍' },
    {type: '7'      , label: '7'      , no: '3'  , rarity: 'C', cardtext: '7の倍数', ratetext: 'スコア7倍' },
    {type: '11'     , label: 'ELEVEN' , no: '4'  , rarity: 'C', cardtext: '11の倍数', ratetext: 'スコア11倍' },
    {type: '13'     , label: 'Jason'  , no: '5'  , rarity: 'C', cardtext: '13の倍数', ratetext: 'スコア13倍' },
    {type: '17'     , label: 'Gauss'  , no: '6'  , rarity: 'R', cardtext: '17の倍数', ratetext: 'スコア17倍' },
    {type: 'odd'    , label: 'ODD'    , no: '11' , rarity: 'C', cardtext: '奇数', ratetext: 'スコア2倍' },
    {type: 'even'   , label: 'EVEN'   , no: '12' , rarity: 'C', cardtext: '偶数', ratetext: 'スコア2倍' },
    {type: 'prime'  , label: 'Prime'  , no: '50' , rarity: 'C', cardtext: '素数', ratetext: '出題され得る最大の素数倍' },
    {type: 'perfect', label: 'Perfect', no: '51' , rarity: 'C', cardtext: '完全数', ratetext: '出題され得る最大の数倍' },
    {type: 'sq'     , label: 'Square' , no: '52' , rarity: 'C', cardtext: '正方数', ratetext: 'スコア2乗' },
    {type: 'cubic'  , label: 'Cubic'  , no: '53' , rarity: 'R', cardtext: '立法数', ratetext: 'スコア3乗' },
    {type: 'red'    , label: 'Red'    , no: '100', rarity: 'C', cardtext: '赤を含む色', ratetext: 'スコア2倍' },
    {type: 'green'  , label: 'Green'  , no: '101', rarity: 'C', cardtext: '緑を含む色', ratetext: 'スコア2倍' },
    {type: 'blue'   , label: 'Blue'   , no: '102', rarity: 'C', cardtext: '青を含む色', ratetext: 'スコア2倍' },
    {type: 'yellow' , label: 'Yellow' , no: '103', rarity: 'R', cardtext: '赤か緑を含む色', ratetext: 'スコア2倍。両方含むなら4倍' },
    {type: 'cyan'   , label: 'Cyan'   , no: '104', rarity: 'R', cardtext: '緑か青を含む色', ratetext: 'スコア2倍。両方含むなら4倍' },
    {type: 'magenta', label: 'Magenta', no: '105', rarity: 'R', cardtext: '青か赤を含む色', ratetext: 'スコア2倍。両方含むなら4倍' },
    {type: 'italic', label: 'Italic', no: '201', rarity: 'C', cardtext: '斜体', ratetext: 'スコア2倍' },
    {type: 'bold', label: 'Bold', no: '202', rarity: 'C', cardtext: '太字', ratetext: 'スコア2倍' },
    {type: 'underline', label: 'UnderLine', no: '301', rarity: 'C', cardtext: '下線', ratetext: 'スコア2倍' },
    {type: 'line-through', label: 'Line-through', no: '302', rarity: 'C', cardtext: '打消し線', ratetext: 'スコア2倍' },
    {type: 'overline', label: 'OverLine', no: '303', rarity: 'C', cardtext: '上線', ratetext: 'スコア2倍' },
    {type: 'hamburger', label: 'Hamburger', no: '304', rarity: 'R', cardtext: '装飾線', ratetext: 'スコア2倍' },
    {type: 'base100', label: 'Base+100'  , no: '1000', rarity: 'S', cardtext: '出題される数の上限+100', ratetext: '' },
    {type: 'base200', label: 'Base+200'  , no: '1001', rarity: 'S', cardtext: '出題される数の上限+200', ratetext: '' },
    {type: 'base500', label: 'Base+500'  , no: '1002', rarity: 'S', cardtext: '出題される数の上限+500', ratetext: '' },
    {type: 'draw2'  , label: 'Draw+2'    , no: '1010', rarity: 'S', cardtext: '各ターンにカードを追加で2枚引く', ratetext: '' },
    {type: 'draw4'  , label: 'Draw+4'    , no: '1011', rarity: 'S', cardtext: '各ターンにカードを追加で4枚引く', ratetext: '' },
    {type: 'time1'  , label: 'Time-1'    , no: '1020', rarity: 'S', cardtext: '制限時間マイナス1秒。残り時間ボーナス+200％', ratetext: '' },
    {type: 'time2'  , label: 'Time-2'    , no: '1021', rarity: 'S', cardtext: '制限時間マイナス2秒。残り時間ボーナス+400％', ratetext: '' },
];

const getCrad = (type) => {
  for (const card of cardMst) {
    if(card.type === type) {
      let newCard = { type : card.type, label : card.label, no : card.no, rarity: card.rarity, cardtext : card.cardtext, ratetext : card.ratetext };
      return newCard;
    }
  }
  return cardMst[0];
}
const getCradList = (rarity) => {
  const CradList = [];
  for (const card of cardMst) {
    if(card.rarity === rarity) {
      CradList.push( getCrad(card.type) );
    }
  }
  return CradList;
}

var cardList = [
  getCrad('fizz'),
  getCrad('buzz'),
  getCrad('fizz'),
  getCrad('fizz'),
  getCrad('buzz'),
  getCrad('fizz'),
  getCrad('fizz'),
  getCrad('buzz'),
  getCrad('fizz'),
  getCrad('buzz'),
];


// 山札クラス
class Deck {
  constructor(options = {}) {
    this._deck = [...cardList]; // deckBaseをコピー
    this._inplay = [];
    this._trash = [];

    // シャッフル
    this._deck.sort((a, b) => Math.random() - 0.5);
  }

  // 山札からカードを取り出すメソッド
  deal(num) {
    this._trash.push( ...this._inplay.splice(0, this._inplay.length ) ); // 0番目から配列の個数分削除して、削除したものをすべて展開してpushすると、つまり場のカードを全部捨て札へ移動するようなことができる
    let d = num - this._deck.length;
    
    
    
    if( d > 0 ) {
      this._inplay.push( ...this._deck.splice(0, this._deck.length ) );
      
      this._deck.push( ...this._trash.splice(0, this._trash.length ) );
      this._deck.sort((a, b) => Math.random() - 0.5);
      
      
      
      if( d > this._deck.length ) {
        this._inplay.push( ...this._deck.splice(0, this._deck.length ) );
      } else {
        this._inplay.push( ...this._deck.splice(0, d ) );
      }
    } else {
      this._inplay.push( ...this._deck.splice(0, num ) );
    }
    
    //alert('deck' + this._deck.length + 'inplay' + this._inplay.length + 'trash' + this._trash.length);
    
    return this._inplay;
  }
  
  // カードピック
  pick(card) {
    if(false) {
      // なんか特別なことをやる時用
    } else {
      this._trash.push( getCrad(card.type) );
    }
  }
  
  newCycle() {
    this._deck.push( ...this._inplay.splice(0, this._inplay.length ) );
    this._deck.push( ...this._trash.splice(0, this._trash.length ) );
    this._deck.sort((a, b) => Math.random() - 0.5);
  }

  getDeckList() {
    //カウントするためのリストの作成
    let countList  = structuredClone(cardMst);
    countList.map((c) => c.count = 0);

    let wholeCardList =  structuredClone(this._deck);
    wholeCardList.push( ...this._inplay );
    wholeCardList.push( ...this._trash);
  
    //使用するカードをカウントする
    for(const card of wholeCardList){
      for(const cList of countList){
        if(card.type == cList.type){
          cList.count = cList.count + 1;
        }
      }
    }

    return countList;
  }
}



//数字を判定する関数たち
const isFIZZ = (number) => {
  return (number % 3 === 0);
}

const isBUZZ = (number) => {
  return (number % 5 === 0);
}

const isFIZZBUZZ = (number) => {
  return (number % 15 === 0);
}

const isPrime = (number) => {

  //1は素数でない
  if(number === 1) return false;
  //2は素数
  if(number === 2) return true;
  //偶数はfalse
  if(number % 2 === 0) return false;
  //奇数で割り切れるならfalse
  for(let i = 3; i < number; i = i + 2){
    if(number % i === 0) return false;
  }
  return true;
}

const isSeven = (number) => {
  return (number % 7 === 0);
}

const isEleven = (number) => {
  return (number % 11 === 0);
}

const isJason = (number) => {
  return (number % 13 === 0);e;
}

const isGauss = (number) => {
  return (number % 17 === 0);
}

const isOdd = (number) => {
  return (number % 2 === 1);
}

const isEven = (number) => {
  return (number % 2 === 0);
}

const isPerfect = (number) => {
  //少なすぎるので一旦直書きで
  if(number === 6 || number === 28 || number === 496 || number === 8128) {
    return true;
  }else{
    return false;
  }
}

const isSquare = (number) => {
  //誤差を想定していない
  return Number.isInteger(Math.sqrt(number));
}

const isCubic = (number) => {
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





//スコアを計算する
const getScore = (list, random, color, font, line, time, timeReduce, maxHand, maxNum) =>{
  let cardList = cardListParser(list);
  let score = random;
  let FIZZflag = false;
  let BUZZflag = false;
  let SevenFlag = false;
  let ElevenFlag = false;
  let PerfectFlag = false;

  let useCardValue = 0;

  for(const c of cardList) {
    if(c.count > 0){
      useCardValue = useCardValue + c.count;
    }
  }




  //使用するカードごとに条件に一致しているか確認する
  for(const v of cardList) {
    if(v.type === "fizz" && v.count > 0){
      if(isFIZZ(random)){
        FIZZflag = true;
        score = score * (3 + (v.count -1) * 0.1);
      }
    }
    if(v.type === "buzz" && v.count > 0){
      if(isBUZZ(random)){
        BUZZflag = true;
        score = score * (5 + (v.count -1) * 0.1);
      }
    }
    if(v.type === "7" && v.count > 0){
      if(isSeven(random)){
        SevenFlag = true;
        score = score * (7 + (v.count -1) * 0.1);
      }
    }
    if(v.type === "11" && v.count > 0){
      if(isEleven(random)){
        ElevenFlag = true;
        score = score * (11 + (v.count -1) * 0.1);
    }
    }
    if(v.type === "13" && v.count > 0){
      if(isJason(random)){
        score = score * (13 + (v.count -1) * 0.1);

      }
    }
    if(v.type === "17" && v.count > 0){
      if(isGauss(random)){
        score = score * (17 + (v.count -1) * 0.1);

      }
    }
    if(v.type === "odd" && v.count > 0){
      if(isOdd(random)){
        score = score * (2 + (v.count -1) * 0.1);

      }
    }
    if(v.type === "even" && v.count > 0){
      if(isEven(random)){
        score = score * (2 + (v.count -1) * 0.1);

      }
    }
    if(v.type === "prime" && v.count > 0){
      if(isPrime(random)){
        score = score * (getMaxPrime(maxNum) + (v.count -1) * 0.1);
      }
    }
    if(v.type === "perfect" && v.count > 0){
      if(isPerfect(random)){
        PerfectFlag = true;
        score = score * (random + (v.count -1) * 0.1);

      }
    }
    if(v.type === "sq" && v.count > 0){
      if(isSquare(random)){
        score = score * (16 + (v.count -1) * 0.1);

      }
    }
    if(v.type === "cubic" && v.count > 0){
      if(isCubic(random)){
        score = score * (216 + (v.count -1) * 0.1);

      }
    }


    if(v.type === "red" && v.count > 0){
      if(isRed(color)){
        score = score * (2 + (v.count -1) * 0.1);

      }
    }

    if(v.type === "green" && v.count > 0){
      if(isGreen(color)){
        score = score * (2 + (v.count -1) * 0.1);

      }
    }

    if(v.type === "blue" && v.count > 0){
      if(isBlue(color)){
        score = score * (2 + (v.count -1) * 0.1);

      }
    }
    if(v.type === "yellow" && v.count > 0){
      if(isYellow(color)){
        score = score * (2 + (v.count -1) * 0.1);

      }
    }
    if(v.type === "cyan" && v.count > 0){
      if(isCyan(color)){
        score = score * (2 + (v.count -1) * 0.1);

      }
    }

    if(v.type === "yellow" && v.count > 0){
      if(isYellow(color)){
        score = score * (2 + (v.count -1) * 0.1);
      }
    }

    if(v.type === "cyan" && v.count > 0){
      if(isCyan(color)){
        score = score * (2 + (v.count -1) * 0.1);
      }
    }

    if(v.type === "magenta" && v.count > 0){
      if(isMagenta(color)){
        score = score * (2 + (v.count -1) * 0.1);
      }
    }

    if(v.type === "italic" && v.count > 0){
      if(isItalic(font)){
        score = score * (2 + (v.count -1) * 0.1);
      }
    }

    if(v.type === "bold" && v.count > 0){
      if(isBold(font)){
        score = score * (2 + (v.count -1) * 0.1);
      }
    }

    if(v.type === "underline" && v.count > 0){
      if(isUnderLine(line)){
        score = score * (2 + (v.count -1) * 0.1);
      }
    }
    if(v.type === "line-through" && v.count > 0){
      if(isLineThrough(line)){
        score = score * (2 + (v.count -1) * 0.1);
      }
    }
    if(v.type === "overline" && v.count > 0){
      if(isOverLine(line)){
        score = score * (2 + (v.count -1) * 0.1);
      }
    }
    if(v.type === "hamburger" && v.count > 0){
      if(isHamburger(line)){
        score = score * (2 + (v.count -1) * 0.1);
      }
    }

  }


  //複合の判定
  if(FIZZflag && BUZZflag){
    score= score * 15;
  }

  if(SevenFlag && ElevenFlag){
    score= score * 711;
  }

  //全使用の判定
  if(maxHand == useCardValue){
    if(setMisstake(list, random, color, line) <= 0){
      if(PerfectFlag){
        score = score ** 3;
      } else {
        score = score * 2;
      }
    }
  }

  //残り時間補正の計算
  if(setMisstake(list, random, color, line) <= 0){
    if(time === 0){
      return score;
    } else{
      score = score * (1 + time + timeReduce*2 );
      return score;
    }
  }
  return score;
}

const showScore = (list, random, color, font, line, time, timeReduce, maxHand, maxNum) =>{

  let scoreText = 'Base' + '(' + random + ')';

  let cardList = cardListParser(list);
  let addText = '';
  let FIZZflag = false;
  let BUZZflag = false;
  let SevenFlag = false;
  let ElevenFlag = false;
  let PerfectFlag = false;
 

  let useCardValue = 0;

  for(const c of cardList) {
    if(c.count > 0){
      useCardValue = useCardValue + c.count;
    }
  }




  //使用するカードごとに条件に一致しているか確認する
  for(const v of cardList) {
    if(v.type === "fizz" && v.count > 0){
      if(isFIZZ(random)){
        FIZZflag = true;
        addText = '* FIZZ(' +  (3 + (v.count -1) * 0.1) +')';
        scoreText = scoreText + addText;
      } 
    }
    if(v.type === "buzz" && v.count > 0){
      if(isBUZZ(random)){
        BUZZflag = true;
        addText = '* BUZZ(' +  (5 + (v.count -1) * 0.1) +')';
        scoreText = scoreText + addText;
      } 
    }
    if(v.type === "7" && v.count > 0){
      if(isSeven(random)){
        SevenFlag = true;
        addText = '* Seven(' +  (7 + (v.count -1) * 0.1) +')';
        scoreText = scoreText + addText;
      }
    }
    if(v.type === "11" && v.count > 0){
      if(isEleven(random)){
        ElevenFlag = true;
        addText = '* Eleven(' +  (11 + (v.count -1) * 0.1) +')';
        scoreText = scoreText + addText;
    } 
    }
    if(v.type === "13" && v.count > 0){
      if(isJason(random)){
        addText = '* Jason(' +  (13 + (v.count -1) * 0.1) +')';
        scoreText = scoreText + addText;

      }
    }
    if(v.type === "17" && v.count > 0){
      if(isGauss(random)){
        addText = '* Gauss(' +  (17 + (v.count -1) * 0.1) +')';
        scoreText = scoreText + addText;

      }
    }
    if(v.type === "odd" && v.count > 0){
      if(isOdd(random)){
        addText = '* Odd(' +  (2 + (v.count -1) * 0.1) +')';
        scoreText = scoreText + addText;

      }
    }
    if(v.type === "even" && v.count > 0){
      if(isEven(random)){
        addText = '* Even(' +  (2 + (v.count -1) * 0.1) +')';
        scoreText = scoreText + addText;

      }
    }
    if(v.type === "prime" && v.count > 0){
      if(isPrime(random)){
        addText = '* Prime(' +  (getMaxPrime(maxNum) + (v.count -1) * 0.1) +')';
        scoreText = scoreText + addText;

      }
    }
    if(v.type === "perfect" && v.count > 0){
      if(isPerfect(random)){
        PerfectFlag = true;
        addText = '* Perfect(' +  (random + (v.count -1) * 0.1) +')';
        scoreText = scoreText + addText;

      }
    }
    if(v.type === "sq" && v.count > 0){
      if(isSquare(random)){
        addText = '* Square(' +  (16 + (v.count -1) * 0.1) +')';
        scoreText = scoreText + addText;
      }
    }
    if(v.type === "cubic" && v.count > 0){
      if(isCubic(random)){
        addText = '* Cubic(' +  (216 + (v.count -1) * 0.1) +')';
        scoreText = scoreText + addText;

      }
    }


    if(v.type === "red" && v.count > 0){
      if(isRed(color)){
        addText = '* Red(' +  (2 + (v.count -1) * 0.1) +')';
        scoreText = scoreText + addText;

      }
    }

    if(v.type === "green" && v.count > 0){
      if(isGreen(color)){
        addText = '* Green(' +  (2 + (v.count -1) * 0.1) +')';
        scoreText = scoreText + addText;

      }
    }

    if(v.type === "blue" && v.count > 0){
      if(isBlue(color)){
        addText = '* Blue(' +  (2 + (v.count -1) * 0.1) +')';
        scoreText = scoreText + addText;

      }
    }
    if(v.type === "yellow" && v.count > 0){
      if(isYellow(color)){
        addText = '* Yellow(' +  (2 + (v.count -1) * 0.1) +')';
        scoreText = scoreText + addText;

      }
    }
    if(v.type === "cyan" && v.count > 0){
      if(isCyan(color)){
        addText = '* Cyan(' +  (2 + (v.count -1) * 0.1) +')';
        scoreText = scoreText + addText;

      }
    }

    if(v.type === "magenta" && v.count > 0){
      if(isMagenta(color)){
        addText = '* Magenta(' +  (2 + (v.count -1) * 0.1) +')';
        scoreText = scoreText + addText;
      }
    }

    if(v.type === "italic" && v.count > 0){
      if(isItalic(font)){
        addText = '* Italic(' +  (2 + (v.count -1) * 0.1) +')';
        scoreText = scoreText + addText;
      }
    }

    if(v.type === "bold" && v.count > 0){
      if(isBold(font)){
        addText = '* Bold(' +  (2 + (v.count -1) * 0.1) +')';
        scoreText = scoreText + addText;
      }
    }

    if(v.type === "underline" && v.count > 0){
      if(isUnderLine(line)){
        addText = '* UnderLine(' +  (2 + (v.count -1) * 0.1) +')';
        scoreText = scoreText + addText;
      }
    }
    if(v.type === "line-through" && v.count > 0){
      if(isLineThrough(line)){
        addText = '* LineThrough(' +  (2 + (v.count -1) * 0.1) +')';
        scoreText = scoreText + addText;
      }
    }
    if(v.type === "overline" && v.count > 0){
      if(isOverLine(line)){
        addText = '* OverLine(' +  (2 + (v.count -1) * 0.1) +')';
        scoreText = scoreText + addText;
      }
    }
    if(v.type === "hamburger" && v.count > 0){
      if(isHamburger(line)){
        addText = '* Hamburger!(' +  (2 + (v.count -1) * 0.1) +')';
        scoreText = scoreText + addText;
      }
    }

  }


  //複合の判定
  if(FIZZflag && BUZZflag){
    addText = '* FIZZBUZZ!(15)';
    scoreText = scoreText + addText;
  }

  if(SevenFlag && ElevenFlag){
    addText = '* SEVENELEVEN!(15)';
    scoreText = scoreText + addText;
  }

  //全使用の判定
  if(maxHand == useCardValue){
    if(setMisstake(list, random, color, list) <= 0){
      if(PerfectFlag){
        addText = 'PERFECTNUMBER!(^2)';
        scoreText = '( ' + scoreText + ' )' + addText;
      } else {
        addText = '* PERFECT!(2)';
        scoreText = scoreText + addText;
      }
    }
  }

  //残り時間補正の計算
  if(setMisstake(list, random, color, line) <= 0){
    if(time !== 0){
      addText = '* Time Bonus!(' + (1 + time + timeReduce*2 ) + ')';
      scoreText = scoreText + addText;
    }
  }
  return scoreText;
}

const add2Deck = (card) => {
  if(card === 'fizz') {
    cardList.add({type: 'fizz', label: 'FIZZ' });
  }
  if(card === 'buzz') {
    cardList.add({type: 'buzz', label: 'BUZZ' });
  }
  if(card === 'prime') {
    cardList.add({type: 'prime', label: 'Prime'});
  }
  if(card === 'red') {
    cardList.add({type: 'red', label: 'Red'});
  }
  if(card === 'green') {
    cardList.add({type: 'green', label: 'Green'});
  }
  if(card === 'blue') {
    cardList.add({type: 'blue', label: 'blue'});
  }
}


const getPickOption =  (n) => {
  let list = new Array();
  
  // 1枚目はシステムカードが出る
  const sList = getCradList('S');
  let r = Math.floor(Math.random() * sList.length);
  list.push( getCrad( sList[r].type ) );
  
  for(let i = 0; i < n-1 ; i++) {
    // 2枚目はレアが出るかも
    let randomG = Math.floor(Math.random() * 100);
    randomG = 0;
    if(i == 0 && randomG < 50) {
      const rList = getCradList('R');
      let r = Math.floor(Math.random() * rList.length);
      list.push( getCrad( rList[r].type ) );
    } else {
      const cList = getCradList('C');
      let r = Math.floor(Math.random() * cList.length);
      list.push( getCrad( cList[r].type ) );
    }
  }
  return list;
}

const cardListParser = (list) => {
  
  //使用するカードをカウントするためのリストを作成する
  let countList  = structuredClone(cardMst);
  countList.map((c) => c.count = 0);

  //使用するカードをカウントする
  for(const card of list){
    if(card.isUse){
      for(const cList of countList){
      	if(cList.type === 'red') {
          if(isRed(card.type)) {
          	cList.count = cList.count + 1;
          }
      	} else if(cList.type === 'green') {
      	  if(isGreen(card.type)) {
          	cList.count = cList.count + 1;
          }
      	} else if(cList.type === 'blue') {
      	  if(isBlue(card.type)) {
          	cList.count = cList.count + 1;
          }
      	} else {
          if(card.type == cList.type){
            cList.count = cList.count + 1;
          }
        }
      }
    }
  }
  return countList;
}

function setMisstake(cardList, random, color, line) {
  let misstake = 0;
  for(const card of cardList) {
  	  switch(card.type) {
  	  	case `fizz`:
  	  	  card.isMiss = xor( card.isUse, isFIZZ(random));
  	  	  break;
  	  	case `buzz`:
  	  	  card.isMiss = xor( card.isUse, isBUZZ(random));
  	  	  break;
  	  	case `7`:
  	  	  card.isMiss = xor( card.isUse, isSeven(random));
  	  	  break;
  	  	case `11`:
  	  	  card.isMiss = xor( card.isUse, isEleven(random));
  	  	  break;
  	  	case `13`:
  	  	  card.isMiss = xor( card.isUse, isJason(random));
  	  	  break;
  	  	case `17`:
  	  	  card.isMiss = xor( card.isUse, isGauss(random));
  	  	  break;
  	  	case `odd`:
  	  	  card.isMiss = xor( card.isUse, isOdd(random));
  	  	  break;
  	  	case `even`:
  	  	  card.isMiss = xor( card.isUse, isEven(random));
  	  	  break;
  	  	case `prime`:
  	  	  card.isMiss = xor( card.isUse, isPrime(random));
  	  	  break;
  	  	case `perfect`:
  	  	  card.isMiss = xor( card.isUse, isPerfect(random));
  	  	  break;
  	  	case `sq`:
  	  	  card.isMiss = xor( card.isUse, isSquare(random));
  	  	  break;
  	  	case `cubic`:
  	  	  card.isMiss = xor( card.isUse, isCubic(random));
  	  	  break;
  	  	case `red`:
  	  	  card.isMiss = xor( card.isUse, isRed(color));
  	  	  break;
  	  	case `green`:
  	  	  card.isMiss = xor( card.isUse, isGreen(color));
  	  	  break;
  	  	case `blue`:
  	  	  card.isMiss = xor( card.isUse, isBlue(color));
  	  	  break;
  	  	case `yellow`:
  	  	  card.isMiss = xor( card.isUse, isRed(color) || isGreen(color));
  	  	  break;
  	  	case `cyan`:
  	  	  card.isMiss = xor( card.isUse, isBlue(color) || isGreen(color));
  	  	  break;
  	  	case `magenta`:
  	  	  card.isMiss = xor( card.isUse, isBlue(color) || isRed(color));
  	  	  break;
        case `italic`:
          card.isMiss = xor( card.isUse, isItalic(font));
          break;
        case `bold`:
          card.isMiss = xor( card.isUse, isBold(font));
          break;
        case `underline`:
          card.isMiss = xor( card.isUse, isUnderLine(line));
          break;
        case `line-through`:
          card.isMiss = xor( card.isUse, isLineThrough(line));
          break;
        case `overline`:
            card.isMiss = xor( card.isUse, isOverLine(line));
            break;
        case `hamburger`:
            card.isMiss = xor( card.isUse, isHamburger(line));
            break;
  	  }
  	  
  	  if(card.isMiss) {
        misstake = misstake + 1;
  	  }
  }
  
  return misstake;
}

const isMistake = (list, random, color) =>{
  let cardList = cardListParser(list);

  //使用するカードごとに条件に一致しているか確認する
  for(const v of cardList) {
    if(v.type === "fizz" && v.count > 0){
      if(! isFIZZ(random)){
        return true;
      }
    }
    if(v.type === "buzz" && v.count > 0){
      if(! isBUZZ(random)){
        return true;
      }
    }
    if(v.type === "7" && v.count > 0){
      if(! isSeven(random)){
        return true;
      }
    }
    if(v.type === "11" && v.count > 0){
      if(! isEleven(random)){
        return true;
      }
    }
    if(v.type === "13" && v.count > 0){
      if(! isJason(random)){
        return true;
      }
    }
    if(v.type === "17" && v.count > 0){
      if(! isGauss(random)){
        return true;
      }
    }
    if(v.type === "odd" && v.count > 0){
      if(! isOdd(random)){
        return true;
      }
    }
    if(v.type === "even" && v.count > 0){
      if(! isEven(random)){
        return true;
      }
    }
    if(v.type === "prime" && v.count > 0){
      if(! isPrime(random)){
        return true;
      }
    }
    if(v.type === "perfect" && v.count > 0){
      if(! isPerfect(random)){
        return true;
      }
    }
    if(v.type === "sq" && v.count > 0){
      if(! isSquare(random)){
        return true;
      }
    }
    if(v.type === "cubic" && v.count > 0){
      if(! isCubic(random)){
        return true;
      }
    }

    if(v.type === "red" && v.count > 0){
      if(! isRed(color)){
        return true;
      }
    }

    if(v.type === "green" && v.count > 0){
      if(! isGreen(color)){
        return true;
      }
    }

    if(v.type === "blue" && v.count > 0){
      if(! isBlue(color)){
        return true;
      }
    }
    if(v.type === "yellow" && v.count > 0){
      if(! isYellow(color)){
        return true;
      }
    }
    if(v.type === "cyan" && v.count > 0){
      if(! isCyan(color)){
        return true;
      }
    }


  }

    //誤りがないならfalseを返す
    return false;
}

const getMaxPrime = (max) => {
  for(let i = max; i > 0; i--) {
    if(isPrime(i)) return i;
  }
  return 1; //本当は1ではないがスコア計算に使う都合上1を返す
}

