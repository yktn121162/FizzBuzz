

// これにエレメントを渡すと選択状態を切り替えることができる
function flipSelect(e) {
	// 選択状態かをclassList.containsで確認する
	if( e.classList.contains('selected') ) {
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
	// プレイエリアとデッキリストエリアを見せる
	// コンティニューを見据えると、これをやる前に各種初期化が必要
	document.getElementById('playarea').hidden = false;
	document.getElementById('decklistarea').hidden = false;
}