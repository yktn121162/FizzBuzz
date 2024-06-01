

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
  
  // isMissフラグがあれば、
  // 要素にMISSクラスを追加する
  if (card.isMiss) {
    elem.classList.add('miss');
  }

  return elem;
};

// 数字を表す要素を作成する関数
const createNumElement = (number, color, font) => {
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
  let examhis = [];
  let maxinplay = 5;
  let maxpick = 5;
  let life = 20;
  let misshis = [];
  
  let deck = new Deck({ includesJoker: true });
  let cards = deck.deal(maxinplay).map((c) => ({ isUse: false, isMiss: false, ...c }));
  let pickCards = getPickOption(maxpick).map((c) => ({ isPick: false, ...c }));
  //alert(typeof pickCards);
  let turn = 1;
  const maxturn = 5;
  let cycle = 1;
  let scorehis = [];
  let highscore = 0;
  let recordscore = 0;
  
  let targetnum = 0;
  let color = 'none';
  let font = 'none';
  
  let startTime = Date.now();
  const initialLimitTime = 10;
  let limitTime = initialLimitTime;
  let timehis = [];

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

function genTime(diff, grid) {
  if(grid) {
    if( diff > 0 ){
      const calcMin = Math.floor(diff / 1000 / 60) % 60;;
      const calcSec = Math.floor(diff / 1000) % 60;
      const calcMSec = diff % 1000;
    
      const m = String(calcMin).padStart(2, '0');
      const s = String(calcSec).padStart(2, '0');
      const ms = String(calcMSec).padStart(3, '0');
    
      const timeText = `${m}:${s}.${ms}`;
    
      return timeText;
    } else {
      const timeText = `00:00.000`;
    
      return timeText;
    }
  } else {
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
}

function arrangeTimeElement(elem) {
  elem.innerText = genTime(CalcDiff(), false);
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

  let fontGenerator1 = Math.floor(Math.random() * 2);
  let fontGenerator2 = Math.floor(Math.random() * 2);


  //色の決定
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

  //フォントの決定

  if (fontGenerator1 === 0) {
    font = 'none';
  } else if (fontGenerator1 === 1) {
    if (fontGenerator2 === 0) {
      font = 'italic';
    } else if (fontGenerator2 === 1) {
      font = 'bold';
    }
  }
  
  examhis.push( { num: targetnum, color: color, font: font } );
  
  startTime = new Date();
  displayTime();
}

function newGame() {
  maxtargetnum = 100;
  examthis = [];
  maxinplay = 5;
  maxpick = 5;
  life = 3;
  misshis = [];
  
  deck = new Deck({ includesJoker: true });
  cards = deck.deal(maxinplay).map((c) => ({ isUse: false, isMiss: false, ...c }));
  pickCards = getPickOption(maxpick).map((c) => ({ isPick: false, ...c }));
  turn = 1;
  cycle = 1;
  scorehis = [];
  highscore = 0;
  yourscore = 0;
  
  targetnum = 0;
  color = 'none';
  
  startTime = Date.now();
  limitTime = initialLimitTime;
  timehis = [];

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
    if (state.phase !== 'play' && state.phase !== 'pick' && state.phase !== 'done' && state.phase !== 'expick' && state.phase !== 'gameOver') {
      state.phase = 'start';
    }
    
    renderTarget.innerText = ''; // 描画内容をクリア
    
    const titleElem = document.createElement('h1');
    titleElem.id = 'title';
    titleElem.innerText = `Asender's FizzBuzz`;
    renderTarget.appendChild(titleElem);
    
    const rsElem = document.createElement('div');
    rsElem.id = 'RecordScore';
    rsElem.innerText = `RecordScore: ${recordscore.toFixed(2)}`;
    renderTarget.appendChild(rsElem);
    
    
    if (state.phase === 'start') {
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
    
  	let score;
  	let misstake;
  	let ansTime = 10000;
  	if (state.phase === 'done') {
      
      // スコア計算だけ先にやる。表示は後

      clearTimeout(timeoutID);
      ansTime = CalcDiff();
      timehis.push(ansTime)
      const ansTimeS = +(ansTime/1000).toFixed(1);
      score = getScore(state.cardList, targetnum, color, ansTimeS, Math.max(initialLimitTime - limitTime, 0),maxinplay); //制限時間を伸ばす可能性を考慮して0と比較しておく

      
      scorehis.push(score);
      
      // ミスチェック
      misstake = setMisstake(state.cardList, targetnum, color);
      misshis.push(misstake);
      // ミスの数だけライフを減らす
      life = life - misstake;
      
      if( turn >= 5 ) {
      	const ts = totalScore();
      	if(ts > highscore) {
          highscore = ts;
        }
      }
    }

    
    const hsElem = document.createElement('div');
    hsElem.id = 'highscore';
    hsElem.innerText = `HighScore: ${highscore.toFixed(2)}`;
    renderTarget.appendChild(hsElem);
    
    if (state.phase === 'play' || state.phase === 'done') {
      const scoreGrid = document.createElement('div');
      scoreGrid.classList.add('score-grid');
      
      const tElm = document.createElement('div');
      tElm.classList.add('score-grid-head');
      tElm.innerText = 'Turn';
      scoreGrid.appendChild(tElm);
      
      const t1Elm = document.createElement('div');
      t1Elm.classList.add('score-grid-head');
      t1Elm.innerText = '1';
      scoreGrid.appendChild(t1Elm);
      const t2Elm = document.createElement('div');
      t2Elm.classList.add('score-grid-head');
      t2Elm.innerText = '2';
      scoreGrid.appendChild(t2Elm);
      const t3Elm = document.createElement('div');
      t3Elm.classList.add('score-grid-head');
      t3Elm.innerText = '3';
      scoreGrid.appendChild(t3Elm);
      const t4Elm = document.createElement('div');
      t4Elm.classList.add('score-grid-head');
      t4Elm.innerText = '4';
      scoreGrid.appendChild(t4Elm);
      const t5Elm = document.createElement('div');
      t5Elm.classList.add('score-grid-head');
      t5Elm.innerText = '5';
      scoreGrid.appendChild(t5Elm);
      
      const hTotalelm = document.createElement('div');
      hTotalelm.classList.add('score-grid-head');
      hTotalelm.innerText = 'Total';
      scoreGrid.appendChild(hTotalelm);
      
      const exElm = document.createElement('div');
      exElm.classList.add('score-grid-head');
      exElm.innerText = 'Exam';
      scoreGrid.appendChild(exElm);
      
      for(let i = 0; i < 5 ; i++) {
        
        if(i >= examhis.length) {
          let elm = document.createElement('div');
          elm.classList.add('score-grid-data');
          elm.innerText = '';
          scoreGrid.appendChild(elm);
        } else {
          let elm = createNumElement(examhis[i].num, examhis[i].color, examhis[i].font);
          elm.classList.remove('number');
          elm.classList.add('score-grid-number');
          scoreGrid.appendChild(elm);
        }
        
      }
      
      const noneelm = document.createElement('div');
      noneelm.classList.add('score-grid-head');
      noneelm.innerText = '';
      scoreGrid.appendChild(noneelm);
      
      const sElm = document.createElement('div');
      sElm.classList.add('score-grid-head');
      sElm.innerText = 'Score';
      scoreGrid.appendChild(sElm);
      
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
      const totalElm = document.createElement('div');
      totalElm.classList.add('score-grid-data');
      totalElm.innerText = total.toFixed(2);
      scoreGrid.appendChild(totalElm);
      
      const timeElm = document.createElement('div');
      timeElm.classList.add('score-grid-head');
      timeElm.innerText = 'Time';
      scoreGrid.appendChild(timeElm);
      
      total = 0;
      for(let i = 0; i < 5 ; i++) {
        let elm = document.createElement('div');
        elm.classList.add('score-grid-data');
        if(i >= timehis.length) {
          elm.innerText = '';
        } else {
          elm.innerText = genTime(timehis[i], true);
          total = total + timehis[i];
        }
        scoreGrid.appendChild(elm);
      }
      const totalTimeElm = document.createElement('div');
      totalTimeElm.classList.add('score-grid-data');
      totalTimeElm.innerText = genTime(total, true);
      scoreGrid.appendChild(totalTimeElm);
      
      
      const missElm = document.createElement('div');
      missElm.classList.add('score-grid-head');
      missElm.innerText = 'Miss';
      scoreGrid.appendChild(missElm);
      
      total = 0;
      for(let i = 0; i < 5 ; i++) {
        let elm = document.createElement('div');
        elm.classList.add('score-grid-data');
        if(i >= misshis.length) {
          elm.innerText = '';
        } else {
          elm.innerText = misshis[i].toFixed(0);
          total = total + misshis[i];
        }
        scoreGrid.appendChild(elm);
      }
      const totalMissElm = document.createElement('div');
      totalMissElm.classList.add('score-grid-data');
      totalMissElm.innerText = total.toFixed(0);
      scoreGrid.appendChild(totalMissElm);
      
      renderTarget.appendChild(scoreGrid);
    }


    const lifeElem = document.createElement('div');
    lifeElem.id = 'life';
    lifeElem.innerText = `Life: ${life}`;
    renderTarget.appendChild(lifeElem);
    
    const timeElem = document.createElement('div');
    arrangeTimeElement(timeElem);
    timeElem.innerText = genTime(ansTime, false);
    renderTarget.appendChild(timeElem);

    //数字を表示するためのコンテナを作成
    const numContainer = document.createElement('div');
    numContainer.classList.add('num-group');
    renderTarget.appendChild(numContainer);
    if (state.phase === 'pick' || state.phase === 'expick') {
      numContainer.appendChild(createNumElement('pick', 'none'));
    } else {
      numContainer.appendChild(createNumElement(targetnum, color, font));
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

      
      
      const nextGameButton = document.createElement('button');
      nextGameButton.innerText = 'ゲームへ';
      nextGameButton.addEventListener('click', () => {
        // ここでカードの処理
        ///alert('new deal');
        
        genExam();
        cards = deck.deal(maxinplay).map((c) => ({ isUse: false, isMiss: false, ...c }));
        scorehis.splice(0, scorehis.length );
        timehis.splice(0, timehis.length );
        misshis.splice(0, misshis.length );
        examhis.splice(0, examhis.length );
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
      
      // スコア計算済み
      //const score = getScore(state.cardList, targetnum, color);
      const scoreLabel = document.createElement('div');
      scoreLabel.id = 'score';
      scoreLabel.innerText = score.toFixed(2);
      renderTarget.appendChild(scoreLabel);
      


      //ライフの更新
      //if(isMistake(state.cardList, targetnum, color)){
      //  life--;
      //}

      //ライフがないならゲームオーバー
      if(life <= 0){
      	// 最高記録チェック
      	let isRecord = false;
      	if(recordscore < highscore) {
      	  recordscore = highscore;
      	  isRecord = true;
      	}
      	
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
            phase: 'start'
          });
         });
         renderTarget.appendChild(newGameButton);
        return;
      }

      if(turn >= 5) {
      	turn = 1;
        cycle = cycle + 1;
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
        turn = turn + 1;
        const nextGameButton = document.createElement('button');
        nextGameButton.innerText = 'Next turn';
        nextGameButton.addEventListener('click', () => {
          // ここでカードの処理
          //alert('new deal');
          
          genExam();
          cards = deck.deal(maxinplay).map((c) => ({ isUse: false, isMiss: false, ...c }));
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


     //デッキリストの生成
     const deckTitle = document.createElement('div');
     const deckElem = document.createElement('h2');
     deckElem.innerText = `Deck List`;
     deckTitle.appendChild(deckElem);
     renderTarget.appendChild(deckTitle);

     const deckListContainer = document.createElement('div');
     deckListContainer.classList.add('deckListContainer');
     for(const card of deck.getDeckList())  {
      if(card.count > 0){
        const cardelm = document.createElement('div');
        cardelm.innerText = `${card.label} : ${card.count} \n ${card.cardtext} \n ${card.ratetext}` ;
        deckListContainer.appendChild(cardelm);
      }
     }

    renderTarget.appendChild(deckListContainer);
  })(document.body, { cardList: cards, pickList: pickCards });
})();