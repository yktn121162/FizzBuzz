

// カードを表す要素を作成する関数
const createCardElement = (card, puttext) => {
  const elem = document.createElement('div');
  if(puttext) {
    elem.classList.add('ontextcard');
  } else {
    elem.classList.add('card');
  }
  if(card.rarity === 'R') {
    elem.classList.add('rare');
  } else if(card.rarity === 'S') {
    elem.classList.add('system');
  } else {
    elem.classList.add('common');
  }

  // 「♣️K」のような表示を作る
  const cardLabel = document.createElement('div');
  cardLabel.innerText = `${card.label}`;
  elem.appendChild(cardLabel);
  if(card.type === '7') {
  	  cardLabel.classList.add('SEVEN');
  } else if(card.type === '11') {
  	  cardLabel.classList.add('ELEVEN');
  }
  
  if(puttext) {
  // カードテキスト
    if(card.rarity === 'S') {
      const cardText = document.createElement('div');
      cardText.innerText = `効果：${card.cardtext}`;
      elem.appendChild(cardText);
    } else {
      const cardText = document.createElement('div');
      cardText.innerText = `条件：${card.cardtext}`;
      elem.appendChild(cardText);
      const cardRate = document.createElement('div');
      cardRate.innerText = `倍率：${card.ratetext}`;
      elem.appendChild(cardRate);
    }
  }
  

  // isUseフラグがあれば、「USE」表示を追加し、
  // 要素にUSEクラスを追加する
  if (card.isUse) {
    const useIndicator = document.createElement('div');
    useIndicator.innerText = 'USE';
    elem.appendChild(useIndicator);
    elem.classList.add('use');
  }

  // isPickフラグがあれば、「PICK」表示を追加し、
  // 要素にPICKクラスを追加する
  if (card.isPick) {
    const pickIndicator = document.createElement('div');
    pickIndicator.innerText = 'PICK';
    elem.appendChild(pickIndicator);
    elem.classList.add('pick');
  }

  return elem;
};

// 数字を表す要素を作成する関数
const createNumElement = (number, color) => {
  const elem = document.createElement('div');
  elem.classList.add('number');
  const numLabel = document.createElement('div');
  numLabel.innerText = `${number}`;
  elem.appendChild(numLabel);


  elem.classList.add(color);
  return elem;
}


// グルーバルスコープに置くと良い気がした
// カード情報作成

  let maxtargetnum = 100;
  let maxinplay = 5;
  let maxpick = 5;
  let life = 3;
  
  let deck = new Deck({ includesJoker: true });
  let cards = deck.deal(maxinplay).map((c) => ({ isUse: false, ...c }));
  let pickCards = getPickOption(maxpick).map((c) => ({ isPick: false, ...c }));
  //alert(typeof pickCards);
  let turn = 1;
  const maxturn = 5;
  let cycle = 1;
  let scorehis = [];
  let highscore = 0;
  let yourscore = 0;
  
  let targetnum = 0;
  let color = 'none';
  
  let startTime = Date.now();
  let limitTime = 10;

  let timeoutID = null;
  let examtimeoutID = null;
  
  let doneFunction;
  


function CalcDiff() {
  let targetTime = new Date( startTime );
  targetTime.setSeconds( targetTime.getSeconds() + limitTime );
  const now = new Date();
  const diff = targetTime.getTime() - now.getTime();
  
  return diff;
}

function genTime() {
  const diff = CalcDiff();
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

function arrangeTimeElement(elem) {
  elem.innerText = genTime();
  elem.id = 'time';
}

function displayTime() {
  const time = document.getElementById('time');
  if(time != null) {
    arrangeTimeElement(time);
    
    const diff = CalcDiff();
    if( diff <= 0 ) {
      doneFunction();
      
      return;
    }
  }
  timeoutID = setTimeout(displayTime, 10);
}

const totalScore = () => {
  return scorehis.reduce(function(sum, element){ return sum + element; }, 0 );
}

// お題作成
function genExam() {
  targetnum = Math.floor(Math.random() * maxtargetnum + 1);
  
  let colorGenerator1 = Math.floor(Math.random() * 3);
  let colorGenerator2 = Math.floor(Math.random() * 3);
  if (colorGenerator1 === 0) {
    color = 'none';
  } else if (colorGenerator1 === 1) {
    if (colorGenerator2 === 0) {
      color = 'red';
    } else if (colorGenerator2 === 1) {
      color = 'green';
    } else if (colorGenerator2 === 2) {
      color = 'blue';
    }
  } else if (colorGenerator1 === 2) {
    if (colorGenerator2 === 0) {
      color = 'yellow';
    } else if (colorGenerator2 === 1) {
      color = 'cyan';
    } else if (colorGenerator2 === 2) {
      color = 'magenta';
    }
  }
  
  
  startTime = new Date();
  displayTime();
}

function newGame() {
  maxtargetnum = 100;
  maxinplay = 5;
  maxpick = 5;
  life = 3;
  deck = new Deck({ includesJoker: true });
  cards = deck.deal(maxinplay).map((c) => ({ isUse: false, ...c }));
  pickCards = getPickOption(maxpick).map((c) => ({ isPick: false, ...c }));
  turn = 1;
  cycle = 1;
  scorehis = [];
  highscore = 0;
  yourscore = 0;
  
  targetnum = 0;
  color = 'none';
  
  startTime = Date.now();
  limitTime = 10;

  timeoutID = null;
  examtimeoutID = null;
}

function genDeckList() {
  let listText ="Deck List \n hoge";
  return listText;
}

//
// メイン処理
//

(function startGame() {


  //genExam();

  // カードを描画する
  // renderTargetは描画対象（ここではdocument.bodyにしておきます）
  // stateは現在の状態（手札のリストとゲームフェーズ）です
  (function render(renderTarget, state) {
  	let score;
  	if (state.phase === 'done') {
      
      // スコア計算だけ先にやる。表示は後
      const ansTime = +(CalcDiff()/1000).toFixed(1);
      score = getScore(state.cardList, targetnum, color, ansTime, Math.max(10 - limitTime, 0)); //制限時間を伸ばす可能性を考慮して0と比較しておく
      
      scorehis.push(score);
      
      if( cycle >= 5 ) {
      	const ts = totalScore();
      	if(ts > highscore) {
          highscore = ts;
        }
      }
    }

    renderTarget.innerText = ''; // 描画内容をクリア
    
    const titleElem = document.createElement('h1');
    titleElem.id = 'title';
    titleElem.innerText = `Asender's FizzBuzz`;
    renderTarget.appendChild(titleElem);
    
    const hsElem = document.createElement('div');
    hsElem.id = 'highscore';
    hsElem.innerText = `HighScore: ${highscore.toFixed(2)}`;
    renderTarget.appendChild(hsElem);

    const lifeElem = document.createElement('div');
    lifeElem.id = 'life';
    lifeElem.innerText = `Life: ${life}`;
    renderTarget.appendChild(lifeElem);
    
    if (state.phase === 'play' || state.phase === 'done') {
      const scoreGrid = document.createElement('div');
      scoreGrid.classList.add('score-grid');
      
      const telm = document.createElement('div');
      telm.classList.add('score-grid-head');
      telm.innerText = 'Turn';
      scoreGrid.appendChild(telm);
      
      const t1elm = document.createElement('div');
      t1elm.classList.add('score-grid-head');
      t1elm.innerText = '1';
      scoreGrid.appendChild(t1elm);
      const t2elm = document.createElement('div');
      t2elm.classList.add('score-grid-head');
      t2elm.innerText = '2';
      scoreGrid.appendChild(t2elm);
      const t3elm = document.createElement('div');
      t3elm.classList.add('score-grid-head');
      t3elm.innerText = '3';
      scoreGrid.appendChild(t3elm);
      const t4elm = document.createElement('div');
      t4elm.classList.add('score-grid-head');
      t4elm.innerText = '4';
      scoreGrid.appendChild(t4elm);
      const t5elm = document.createElement('div');
      t5elm.classList.add('score-grid-head');
      t5elm.innerText = '5';
      scoreGrid.appendChild(t5elm);
      
      const htotalelm = document.createElement('div');
      htotalelm.classList.add('score-grid-head');
      htotalelm.innerText = 'Total';
      scoreGrid.appendChild(htotalelm);
      
      const selm = document.createElement('div');
      selm.classList.add('score-grid-head');
      selm.innerText = 'Score';
      scoreGrid.appendChild(selm);
      
      let total = 0;
      for(let i = 0; i < 5 ; i++) {
        let elm = document.createElement('div');
        elm.classList.add('score-grid-data');
        if(i >= scorehis.length) {
          elm.innerText = '';
        } else {
          elm.innerText = scorehis[i].toFixed(2);
          total = total + scorehis[i];
        }
        scoreGrid.appendChild(elm);
      }
      const totalelm = document.createElement('div');
      totalelm.classList.add('score-grid-data');
      totalelm.innerText = total.toFixed(2);
      scoreGrid.appendChild(totalelm);
      
      renderTarget.appendChild(scoreGrid);
    }

    
    
    
    
    if (state.phase !== 'play' && state.phase !== 'pick' && state.phase !== 'done' && state.phase !== 'expick' && state.phase !== 'gameOver') {
      //state.phase = 'play';
      const GameStartButton = document.createElement('button');
      GameStartButton.innerText = 'ゲームスタート';
      GameStartButton.addEventListener('click', () => {
        genExam();
        render(renderTarget, {
          cardList: state.cardList,
          pickList: state.pickList,
          phase: 'play'
        });
      });
      renderTarget.appendChild(GameStartButton);
      
      return;
    }
    
    const timeElem = document.createElement('div');
    arrangeTimeElement(timeElem);
    renderTarget.appendChild(timeElem);

    //数字を表示するためのコンテナを作成
    const numContainer = document.createElement('div');
    numContainer.classList.add('num-group');
    renderTarget.appendChild(numContainer);
    if (state.phase === 'pick' || state.phase === 'expick') {
      numContainer.appendChild(createNumElement('pick', 'none'));
    } else {
      numContainer.appendChild(createNumElement(targetnum, color));
    }



    // カードの組を表示するコンテナを作成
    const container = document.createElement('div');
    if (state.phase === `pick` || state.phase === `expick`) {
      container.classList.add('pickcard-group');
    } else {
      container.classList.add('card-group');
    }
    renderTarget.appendChild(container);


    if (state.phase === `pick` || state.phase === `expick`) {
    //if (state.phase === `pick`) {
      //alert(typeof state.pickList);

      for (const card of state.pickList) {
        const cardElem = createCardElement(card, true);

        // カードをクリックすると使用状態を切り替え
        // 全体を再描画する
        cardElem.addEventListener('click', () => {
          card.isPick = !card.isPick;
          render(renderTarget, state);
        });

        container.appendChild(cardElem);
      }
      
      if (state.phase === `pick`) {
        // pick実行ボタン表示
        const nextGameButton = document.createElement('button');
        nextGameButton.innerText = 'ピック';
        nextGameButton.addEventListener('click', () => {
        
          render(renderTarget, {
            cardList: state.cardList,
            pickList: state.pickList,
            phase: 'expick'
          });
        });
        renderTarget.appendChild(nextGameButton);
      }
    }

    if (state.phase === `expick`) {
      //alert(typeof state.pickList);


      // 1つだけピックされているとき
      // playへ移動するボタンの表示
      // 何枚でもピックできるようにしてしまう。このゲームではプレイヤーは基本的に自由
      const pickContainer = document.createElement('div');
      
      for(const card of state.pickList){
        if(card.isPick) {
          if(card.rarity === 'S') {
            switch(card.type) {
            case 'base100':
              maxtargetnum = maxtargetnum + 100;
              break;
            case 'base200':
              maxtargetnum = maxtargetnum + 200;
              break;
            case 'base500':
              maxtargetnum = maxtargetnum + 500;
              break;
            case 'draw2':
              maxinplay = maxinplay + 2;
              break;
            case 'draw4':
              maxinplay = maxinplay + 4;
              break;
            case 'time1':
              limitTime = limitTime - 1;
              break;
            case 'time2':
              limitTime = limitTime - 2;
              break;
            }
          } else {
            deck.pick(card);
          }
          
          const cardelm = document.createElement('div');
          cardelm.innerText = `pick: ${card.label}`;
          pickContainer.appendChild(cardelm);
        }
      }

       //デッキリストの生成
       const deckElem = document.createElement('h2');
       deckElem.innerText = `Deck List`;
       renderTarget.appendChild(deckElem);
       
       for(const card of deck.getDeckList())  {
        if(card.count > 0){
          const cardelm = document.createElement('div');
          cardelm.innerText = `${card.type} : ${card.count}`;
          renderTarget.appendChild(cardelm);
        }
       }
      
      
      const nextGameButton = document.createElement('button');
      nextGameButton.innerText = 'ゲームへ';
      nextGameButton.addEventListener('click', () => {
        // ここでカードの処理
        ///alert('new deal');
        
        genExam();
        cards = deck.deal(maxinplay).map((c) => ({ isUse: false, ...c }));
        scorehis.splice(0, scorehis.length );
        render(renderTarget, {
          cardList: cards,
          pickList: state.pickList,
          phase: 'play'
        });
      });
      renderTarget.appendChild(nextGameButton);
      
      renderTarget.appendChild(pickContainer);
    }


    if (state.phase !== 'pick' && state.phase !== 'expick') {
      // 各カードの内容をコンテナに詰め込む
      for (const card of state.cardList) {
        const cardElem = createCardElement(card, false);

        // カードをクリックすると使用状態を切り替え
        // 全体を再描画する
        // ゲームフェーズがplayのとき押せる
        if (state.phase === 'play') {
          cardElem.addEventListener('click', () => {
            card.isUse = !card.isUse;
            render(renderTarget, state);
          });
        }

        container.appendChild(cardElem);
      }
    }

    // 現在のゲームフェーズを見て処理を変える
    if (state.phase === 'done') {
      clearTimeout(timeoutID);
      
      // スコア計算済み
      //const score = getScore(state.cardList, targetnum, color);
      const scoreLabel = document.createElement('div');
      scoreLabel.innerText = score;
      renderTarget.appendChild(scoreLabel);
      


      //ライフの更新
      if(isMistake(state.cardList, targetnum, color)){
        life--;
      }


      //ライフがないならゲームオーバー
      if(life <= 0){
        renderTarget.innerText = ''; // 描画内容をクリア
        const gameOverElem = document.createElement('h1');
        gameOverElem.innerText = `Game Over`;
        renderTarget.appendChild(gameOverElem);

        //リザルトの表示
        const resultElem = document.createElement('div');
        resultElem.id = 'result';
        resultElem.innerText = `High Score: ${highscore.toFixed(2)}`;
        renderTarget.appendChild(resultElem);
    
        //ニューゲームボタンの表示
        const newGameButton = document.createElement('button');
        newGameButton.innerText = 'ニューゲーム';
        newGameButton.addEventListener('click', () => {
          newGame();
          render(renderTarget, {
            cardList: cards,
            pickList: state.pickList,
            phase: null
          });
         });
         renderTarget.appendChild(newGameButton);
        return;
      }

      if(cycle >= 5) {
        cycle = 1;
        // ピックへ移動するボタンの表示
        const nextGameButton = document.createElement('button');
        nextGameButton.innerText = 'ピックへ';
        nextGameButton.addEventListener('click', () => {
          // ここでピックリストの生成
          let pickCards = getPickOption(maxpick).map((c) => ({ isPick: false, ...c }));
          render(renderTarget, {
            cardList: state.cardList,
            pickList: pickCards,
            phase: 'pick'
          });
        });
        renderTarget.appendChild(nextGameButton);
      } else {
        cycle = cycle + 1;
        const nextGameButton = document.createElement('button');
        nextGameButton.innerText = 'Next turn';
        nextGameButton.addEventListener('click', () => {
          // ここでカードの処理
          //alert('new deal');
          
          genExam();
          cards = deck.deal(maxinplay).map((c) => ({ isUse: false, ...c }));
          render(renderTarget, {
            cardList: cards,
            pickList: state.pickList,
            phase: 'play'
          });
        });
        renderTarget.appendChild(nextGameButton);
      }
    } else if (state.phase === 'play') {



      // カード交換ボタン
      // クリックすると保持フラグのついていないカードを交換し
      // 再描画する
      const changeButton = document.createElement('button');
      changeButton.innerText = '使用する';
      changeButton.addEventListener('click', () => {

        render(renderTarget, {
          cardList: state.cardList,
          pickList: state.pickList,
          phase: 'done'
        });
      });
      renderTarget.appendChild(changeButton);
      
      doneFunction = () => {

        render(renderTarget, {
          cardList: state.cardList,
          pickList: state.pickList,
          phase: 'done'
        }); };
    }
  })(document.body, { cardList: cards, pickList: pickCards });
})();