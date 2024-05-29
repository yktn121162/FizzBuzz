

// カードを表す要素を作成する関数
const createCardElement = (card) => {
  const elem = document.createElement('div');
  elem.classList.add('card');

  // 「♣️K」のような表示を作る
  const cardLabel = document.createElement('div');
  cardLabel.innerText = `${card.label}`;
  elem.appendChild(cardLabel);

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
  const deck = new Deck({ includesJoker: true });
  let cards = deck.deal(5).map((c) => ({ isUse: false, ...c }));
  let pickCards = getPickOption(5).map((c) => ({ isPick: false, ...c }));
  //alert(typeof pickCards);
  let turn = 1;
  const maxturn = 5;
  let cycle = 1;
  let scorehis = [];
  let highscore = 0;
  
  let targetnum = 0;
  let color = 'none';

// お題作成
function genExam() {
    targetnum = Math.floor(Math.random() * 100 + 1);
    let colorGenerator = Math.floor(Math.random() * 3);
    if (colorGenerator === 0) {
      color = 'red';
    } else if (colorGenerator === 1) {
      color = 'green';
    } else if (colorGenerator === 2) {
      color = 'blue';
    }
    
    scorehis.splice(0, scorehis.length )
  }

//
// メイン処理
//

(function startGame() {


  genExam();

  // カードを描画する
  // renderTargetは描画対象（ここではdocument.bodyにしておきます）
  // stateは現在の状態（手札のリストとゲームフェーズ）です
  (function render(renderTarget, state) {

    if (state.phase !== 'play' && state.phase !== 'pick' && state.phase !== 'done') {
      state.phase = 'play';
    }
    renderTarget.innerText = ''; // 描画内容をクリア
    

    //数字を表示するためのコンテナを作成
    const numContainer = document.createElement('div');
    numContainer.classList.add('num-group');
    renderTarget.appendChild(numContainer);
    if (state.phase === 'pick') {
      numContainer.appendChild(createNumElement('pick', 'none'));
    } else {
      numContainer.appendChild(createNumElement(targetnum, color));
    }



    // カードの組を表示するコンテナを作成
    const container = document.createElement('div');
    container.classList.add('card-group');
    renderTarget.appendChild(container);


    if (state.phase === `pick`) {
      alert(typeof state.pickList);

      for (const card of state.pickList) {
        const cardElem = createCardElement(card);

        // カードをクリックすると使用状態を切り替え
        // 全体を再描画する
        cardElem.addEventListener('click', () => {
          card.isPick = !card.isPick;
          render(renderTarget, state);
        });

        container.appendChild(cardElem);
      }

      // 1つだけピックされているとき
      // playへ移動するボタンの表示
      var count = 0;
      for(const card of state.pickList){
        if(card.isPick) count++;
      }
      //if (count === 1) {
      {
        const nextGameButton = document.createElement('button');
        nextGameButton.innerText = 'ゲームへ';
        nextGameButton.addEventListener('click', () => {
          // ここでカードの処理
          ///alert('new deal');
          
          genExam();
          cards = deck.deal(5).map((c) => ({ isUse: false, ...c }));
          render(renderTarget, {
            cardList: cards,
            pickList: state.pickList,
            phase: 'play'
          });
        });
        renderTarget.appendChild(nextGameButton);
      }




    }

    //alert('hoge');

    if (state.phase !== 'pick') {
      // 各カードの内容をコンテナに詰め込む
      for (const card of state.cardList) {
        const cardElem = createCardElement(card);

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
      // 役の表示
      const score = getScore(state.cardList, targetnum, color);
      const scoreLabel = document.createElement('div');
      scoreLabel.innerText = score;
      renderTarget.appendChild(scoreLabel);
      
      scorehis.push(score);
      if( score > highscore ) {
        highscore = score;
      }

      if(cycle >= 5) {
        cycle = 0;
        // ピックへ移動するボタンの表示
        const nextGameButton = document.createElement('button');
        nextGameButton.innerText = 'ピックへ';
        nextGameButton.addEventListener('click', () => {
          // ここでピックリストの生成
          //pickCards = ;
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
          cards = deck.deal(5).map((c) => ({ isUse: false, ...c }));
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
    }
  })(document.body, { cardList: cards, pickList: pickCards });
})();