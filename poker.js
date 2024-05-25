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

    // シャッフル
    this._deck.sort((a, b) => Math.random() - 0.5);
  }

  // 山札からカードを取り出すメソッド
  deal(num) {
    return this._deck.splice(0, num);
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
const getScore = (cardList,random,color) =>{
  let score = 0;
  let FIZZflag = false;
  let BUZZflag = false;

  //使用するカードのリストを作成する
  const useCardList =  cardList.filter((c) => c.isUse);

  //使用するカードごとに条件に一致しているか確認する
  for(const v of useCardList) {
    if(v.type === "fizz"){
      FIZZflag = true;
      if(isFIZZ(random)){
        score++;
      }else{
        score--;
      }
    }
    if(v.type === "buzz"){
      BUZZflag = true;
      if(isBUZZ(random)){
        score++;
      }else{
        score--;
      }
    }
    if(v.type === "prime"){
      if(isPrime(random)){
        score++;
      }else{
        score--;
      }
    }

    if(v.type === "red"){
      if(isRed(color)){
        score++;
      }else{
        score--;
      }
    }

    if(v.type === "green"){
      if(isGreen(color)){
        score++;
      }else{
        score--;
      }
    }

    if(v.type === "blue"){
      if(isBlue(color)){
        score++;
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
  randomNum = 3;
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



