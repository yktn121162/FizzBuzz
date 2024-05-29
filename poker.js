const cardMst = [
    {type: 'fizz'   , label: 'FIZZ'   , no: '1' },
    {type: 'buzz'   , label: 'BUZZ'   , no: '2' },
    {type: 'prime'  , label: 'Prime'  , no: '50'},
    {type: 'red'    , label: 'Red'    , no: '100'},
    {type: 'green'  , label: 'Green'  , no: '101'},
    {type: 'blue'   , label: 'Blue'   , no: '102'},
    
];

const getCrad = (type) => {
  for (const card of cardMst) {
    if(card.type === type) {
      let newCard = { type : card.type, label : card.label, no : card.no };
      return newCard;
    }
  }
  return cardMst[0];
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
  return true;
}


//色の判定
const isRed = (color) => {
  return (color === 'red');
}
const isGreen = (color) => {
  return (color === 'green');
}
const isBlue = (color) => {
  return (color === 'blue');
}


//スコアを計算する
const getScore = (list,random,color) =>{
  let cardList = cardListParser(list);
  let score = random;
  let FIZZflag = false;
  let BUZZflag = false;



  //使用するカードごとに条件に一致しているか確認する
  for(const v of cardList) {
    if(v.type === "fizz" && v.count > 0){
      FIZZflag = true;
      if(isFIZZ(random)){
        score = score * (3 + (v.count -1) * 0.1);
      }else{
        score--;
      }
    }
    if(v.type === "buzz" && v.count > 0){
      BUZZflag = true;
      if(isBUZZ(random)){
        score = score * (5 + (v.count -1) * 0.1);
      }else{
        score--;
      }
    }
    if(v.type === "prime" && v.count > 0){
      if(isPrime(random)){
        score++;
      }else{
        score--;
      }
    }

    if(v.type === "red" && v.count > 0){
      if(isRed(color)){
        score = score * (2 + (v.count -1) * 0.1);
      }else{
        score--;
      }
    }

    if(v.type === "green" && v.count > 0){
      if(isGreen(color)){
        score = score * (2 + (v.count -1) * 0.1);
      }else{
        score--;
      }
    }

    if(v.type === "blue" && v.count > 0){
      if(isBlue(color)){
        score = score * (2 + (v.count -1) * 0.1);
      }else{
        score--;
      }
    }


  }


  if(FIZZflag && BUZZflag){
    if(isFIZZBUZZ(random)){
      score= score + 100;
    }else{
      score= score - 100;
    }
  }

  return score;
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
  for(let i = 0; i < n ; i++) {
    let randomNum = Math.floor(Math.random() * 6);
    if(randomNum === 0) {
      list.push( getCrad('fizz') );
    }
    if(randomNum === 1) {
      list.push( getCrad('buzz') );
    }
    if(randomNum === 2) {
      list.push( getCrad('prime') );
    }
    if(randomNum === 3) {
      list.push( getCrad('red') );
    }
    if(randomNum === 4) {
      list.push( getCrad('green') );
    }
    if(randomNum === 5) {
      list.push( getCrad('blue') );
    }
  }
  return list;
}

const cardListParser = (list) => {
  //使用するカードのリストを作成する
  //使用するカードをカウントするためのリストを作成する
  let countList =  [
    {type: 'fizz', count: 0 },
    {type: 'buzz', count: 0 },
    {type: 'prime', count: 0},
    {type: 'red', count: 0},
    {type: 'green', count: 0},
    {type: 'blue', count: 0},
  ]

  //使用するカードをカウントする
  for(const card of list){
    if(card.isUse){
      for(const cList of countList){
        if(card.type == cList.type){
          cList.count = cList.count + 1;
        }
      }
    }
  }
  return countList;
}



