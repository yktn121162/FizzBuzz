
/*
	カードのマスタ
	
	type: カードの固有識別子。実はtypeではない可能性がある。
	label: カード名。重複可。
	no: ソート順。
	rarity: カードのレアリティ。
	   C: コモン。FIZZもBUZZもコモン。
	   R: レア。
	   S: システムカード。
	cardimg: カード画像を特定するために必要な何かしら
	cardtext: カードの使用可能条件を表現するテキスト
	ratetext: カード使用時の倍率を表現するテキスト
	*/
const cardMst = [
    {type: 'fizz'          , label: 'FIZZ'          , no: '1'   , rarity: 'C', cardimg: "", cardtext: '3の倍数', ratetext: 'スコア3倍' },
    {type: 'buzz'          , label: 'BUZZ'          , no: '2'   , rarity: 'C', cardimg: "", cardtext: '5の倍数', ratetext: 'スコア5倍' },
    {type: '7'             , label: '7'             , no: '3'   , rarity: 'C', cardimg: "", cardtext: '7の倍数', ratetext: 'スコア7倍' },
    {type: '11'            , label: 'ELEVEN'        , no: '4'   , rarity: 'C', cardimg: "", cardtext: '11の倍数', ratetext: 'スコア11倍' },
    {type: '13'            , label: 'Jason'         , no: '5'   , rarity: 'C', cardimg: "", cardtext: '13の倍数', ratetext: 'スコア13倍' },
    {type: '17'            , label: 'Gauss'         , no: '6'   , rarity: 'R', cardimg: "", cardtext: '17の倍数', ratetext: 'スコア17倍' },
    {type: 'odd'           , label: 'ODD'           , no: '11'  , rarity: 'C', cardimg: "", cardtext: '奇数', ratetext: 'スコア2倍' },
    {type: 'even'          , label: 'EVEN'          , no: '12'  , rarity: 'C', cardimg: "", cardtext: '偶数', ratetext: 'スコア2倍' },
    {type: 'prime'         , label: 'Prime'         , no: '50'  , rarity: 'C', cardimg: "", cardtext: '素数', ratetext: '出題され得る最大の素数倍' },
    {type: 'perfect'       , label: 'Perfect'       , no: '51'  , rarity: 'C', cardimg: "", cardtext: '完全数', ratetext: '出題され得る最大の数倍' },
    {type: 'sq'            , label: 'Square'        , no: '52'  , rarity: 'C', cardimg: "", cardtext: '正方数', ratetext: 'スコア2乗' },
    {type: 'cubic'         , label: 'Cubic'         , no: '53'  , rarity: 'R', cardimg: "", cardtext: '立法数', ratetext: 'スコア3乗' },
    {type: 'red'           , label: 'Red'           , no: '100' , rarity: 'C', cardimg: "", cardtext: '赤を含む色', ratetext: 'スコア2倍' },
    {type: 'green'         , label: 'Green'         , no: '101' , rarity: 'C', cardimg: "", cardtext: '緑を含む色', ratetext: 'スコア2倍' },
    {type: 'blue'          , label: 'Blue'          , no: '102' , rarity: 'C', cardimg: "", cardtext: '青を含む色', ratetext: 'スコア2倍' },
    {type: 'yellow'        , label: 'Yellow'        , no: '103' , rarity: 'R', cardimg: "", cardtext: '赤か緑を含む色', ratetext: 'スコア2倍。両方含むなら4倍' },
    {type: 'cyan'          , label: 'Cyan'          , no: '104' , rarity: 'R', cardimg: "", cardtext: '緑か青を含む色', ratetext: 'スコア2倍。両方含むなら4倍' },
    {type: 'magenta'       , label: 'Magenta'       , no: '105' , rarity: 'R', cardimg: "", cardtext: '青か赤を含む色', ratetext: 'スコア2倍。両方含むなら4倍' },
    {type: 'italic'        , label: 'Italic'        , no: '201' , rarity: 'C', cardimg: "", cardtext: '斜体', ratetext: 'スコア2倍' },
    {type: 'bold'          , label: 'Bold'          , no: '202' , rarity: 'C', cardimg: "", cardtext: '太字', ratetext: 'スコア2倍' },
    {type: 'underline'     , label: 'UnderLine'     , no: '301' , rarity: 'C', cardimg: "", cardtext: '下線', ratetext: 'スコア2倍' },
    {type: 'line-through'  , label: 'Line-through'  , no: '302' , rarity: 'C', cardimg: "", cardtext: '打消し線', ratetext: 'スコア2倍' },
    {type: 'overline'      , label: 'OverLine'      , no: '303' , rarity: 'C', cardimg: "", cardtext: '上線', ratetext: 'スコア2倍' },
    {type: 'hamburger'     , label: 'Hamburger'     , no: '304' , rarity: 'R', cardimg: "", cardtext: '装飾線', ratetext: 'スコア2倍' },
    {type: 'base100'       , label: 'Base+100'      , no: '1000', rarity: 'S', cardimg: "", cardtext: '出題される数の上限+100', ratetext: '' },
    {type: 'base200'       , label: 'Base+200'      , no: '1001', rarity: 'S', cardimg: "", cardtext: '出題される数の上限+200', ratetext: '' },
    {type: 'base500'       , label: 'Base+500'      , no: '1002', rarity: 'S', cardimg: "", cardtext: '出題される数の上限+500', ratetext: '' },
    {type: 'draw2'         , label: 'Draw+2'        , no: '1010', rarity: 'S', cardimg: "", cardtext: '各ターンにカードを追加で2枚引く', ratetext: '' },
    {type: 'draw4'         , label: 'Draw+4'        , no: '1011', rarity: 'S', cardimg: "", cardtext: '各ターンにカードを追加で4枚引く', ratetext: '' },
    {type: 'time1'         , label: 'Time-1'        , no: '1020', rarity: 'S', cardimg: "", cardtext: '制限時間マイナス1秒。残り時間ボーナス+200％', ratetext: '' },
    {type: 'time2'         , label: 'Time-2'        , no: '1021', rarity: 'S', cardimg: "", cardtext: '制限時間マイナス2秒。残り時間ボーナス+400％', ratetext: '' },
];

/*カードの固有識別子を指定してカードのオブジェクトを生成して返す。ないtypeを指定するとFIZZが返るが、それが良いのかは不明*/
const getCrad = (type) => {
  for (const card of cardMst) {
    if(card.type === type) {
    	/*コロンの左にキー、右に値。マスタから同じキーの値をコピーしている*/
      let newCard = { 
          type : card.type, 
          label : card.label, 
          no : card.no, 
          rarity: card.rarity, 
          cardimg : card.cardimg, 
          cardtext : card.cardtext, 
          ratetext : card.ratetext };
      return newCard;
    }
  }
  return cardMst[0];
}

/*レアリティを指定して、そのレアリティのカードを全て集めたリストを作って返す。ないレアリティを指定すると空のリストが返る*/
const getCradList = (rarity) => {
  const CradList = [];
  for (const card of cardMst) {
  	  /*マスタをぺろしてレアリティが指定のやつだったらGetCard()してリストへ投げ込んでいく。*/
    if(card.rarity === rarity) {
      CradList.push( getCrad(card.type) );
    }
  }
  return CradList;
}

/*初期手札定義*/
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