var cardList = [
  
  {type: 'fizz', label: 'FIZZ' },
  {type: 'buzz', label: 'BUZZ' },
  {type: 'fizz', label: 'FIZZ' },
  {type: 'buzz', label: 'BUZZ' },
  {type: 'prime', label: 'Prime'},
  {type: 'fizz', label: 'FIZZ' },
  {type: 'buzz', label: 'BUZZ' },
  {type: 'fizz', label: 'FIZZ' },
  {type: 'buzz', label: 'BUZZ' },
  {type: 'prime', label: 'Prime'},
  {type: 'red', label: 'Red'},
  {type: 'green', label: 'Green'},
  {type: 'blue', label: 'Blue'},
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
  let randomNum = Math.floor(Math.random() * 6);
  for(let i = 0; i < n ; i++) {
    if(randomNum === 0) {
      list.push({type: 'fizz', label: 'FIZZ' });
    }
    if(randomNum === 1) {
      list.push({type: 'buzz', label: 'BUZZ'});
    }
    if(randomNum === 2) {
      list.push({type: 'prime', label: 'Prime'});
    }
    if(randomNum === 3) {
      list.push({type: 'red', label: 'Red'});
    }
    if(randomNum === 4) {
      list.push({type: 'green', label: 'Green'});
    }
    if(randomNum === 5) {
      list.push({type: 'blue', label: 'blue'});
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



