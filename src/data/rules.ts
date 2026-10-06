import { ClubRule } from '../types/game';

export const INITIAL_CLUB_RULES: ClubRule[] = [
  {
    id: 1,
    title: '第一條：禁止將學弟妹當韭菜收割',
    subtitle: '社員不是你的離線錢包',
    description: '社團是學習交流的學術殿堂，嚴禁幹部以「內部研討會」、「社友限定私募」為名，誘導新社員接盤高風險代幣或購買無價值空投名額。',
    satiricalNote: '「聽說入社第一課是教你怎麼用 Metamask 給社長打錢？」—— 某位醒悟的幹部自白',
    reformedBy: '炒幣投機客',
    unlocked: false,
  },
  {
    id: 2,
    title: '第二條：金融科技旨在普惠大眾，非內線投機遮羞布',
    subtitle: '別把賭博包裝成 FinTech 創新',
    description: '區塊鏈與演算法交易乃科研學問，嚴禁以社團名義宣稱「保證年化 300% 搬磚量化模型」吸金，凡宣稱穩賺不賠者，一律請 Zanna 雷射伺候。',
    satiricalNote: '「我們不是在做龐氏騙局，我們這是 DeFi 流動性互助池！」—— 爆倉前幹部之遺言',
    reformedBy: '割韭菜大副',
    unlocked: false,
  },
  {
    id: 3,
    title: '第三條：嚴禁公款私用開 100 倍槓桿',
    subtitle: '社費是大家的，不是你合約帳戶的保證金',
    description: '每學期收取的社費、活動贊助款必須全數公開透明上鏈並公布記帳明細，嚴禁任何幹部偷偷挪用社費抄底迷因幣或開多空合約。',
    satiricalNote: '「當時我想著只要翻倍就能給社團買十台伺服器，誰知道一根插針社費就歸零了...」',
    reformedBy: '爆倉前社長',
    unlocked: false,
  },
  {
    id: 4,
    title: '第四條：拒絕假實習真直銷與老鼠會拉下線',
    subtitle: '實習是去學本領，不是去當免洗業務員',
    description: '社團內發布之企業合作與實習職缺必須經過學術委員會嚴格審查，嚴禁假借高薪外商實習之名，強迫社員先買兩萬塊「量化分析軟體課程」。',
    satiricalNote: '「學弟，我看你骨骼驚奇，這張直銷合約簽下去，下學期你就是區塊鏈總監。」',
    reformedBy: '假實習老鼠會學長',
    unlocked: false,
  },
  {
    id: 5,
    title: '第五條：做人講求誠信，莫造 PPT 空殼項目騙贊助',
    subtitle: '把時間花在寫代碼與架構，而非造黑話',
    description: '黑客松與專案成果發表嚴禁「只寫了3頁PPT就號稱解決全球跨境支付痛點」，代碼庫需有真實 Commit，禁止造假測試數據騙取學校補助。',
    satiricalNote: '「PPT 上寫著跨鏈去中心化微支付，實際上 Demo 是在按鍵精靈手動轉帳。」',
    reformedBy: 'PPT空頭話術師',
    unlocked: false,
  },
  {
    id: 6,
    title: '第六條：禁止黑話霸凌，拒絕知識傲慢',
    subtitle: '講人話，不要每一句都夾雜 5 個縮寫詞',
    description: '討論社團課題時禁止以「你連 Zero-Knowledge Rollup 和 EIP-4844 的 Danksharding 都不懂你來金科社幹嘛？」羞辱初學者。應耐心引導，莫忘初學苦。',
    satiricalNote: '「他一邊抽電子煙一邊對我說 Tokenomics，我以為他在跟我講某種義大利麵。」',
    reformedBy: '黑話PUA部長',
    unlocked: false,
  },
  {
    id: 7,
    title: '第七條：專案虧損誠實認錯，勿拉學弟妹墊背',
    subtitle: '勇於承擔風險，拒絕甩鍋行為',
    description: '若社團投資研究小組之公開模擬倉或測試網策略失敗，應進行深度覆盤與復盤教學，切勿私下私訊學弟妹「這隻幣跌到底了快幫忙接盤抬轎」。',
    satiricalNote: '「學妹，這不是套牢，這是長線價值投資！」—— 已被感化退群的公關部長',
    reformedBy: '抬轎啦啦隊長',
    unlocked: false,
  },
  {
    id: 8,
    title: '第八條：社辦是學術交流之地，不是黑產洗錢溫床',
    subtitle: '還給社員安靜寫程式與討論文獻的空間',
    description: '社團辦公室應保持整潔明亮，禁止在社辦私自擺放礦機偷學校宿舍電力、亦嚴禁半夜在社辦開非法 OTC 虛擬幣現金交易櫃檯。',
    satiricalNote: '「難怪社辦冷氣開到最強還是像烤箱，原來桌底下藏了八張 RTX 4090 在挖礦！」',
    reformedBy: '社辦礦霸學長',
    unlocked: false,
  },
  {
    id: 9,
    title: '第九條：尊重多元金融觀點，反對極端邪教式崇拜',
    subtitle: '金融世界遼闊，莫作井底之蛙',
    description: '傳統金融監管科技 (RegTech)、量化風控、普惠銀行、保險科技均有卓越價值，禁止極端吹捧投機詐術而鄙視傳統金融學術底蘊。',
    satiricalNote: '「學長說讀財金系的都是老古董，只有他的狗頭迷因幣才是人類文明未來。」',
    reformedBy: '迷因邪教護法',
    unlocked: false,
  },
  {
    id: 10,
    title: '第十條：科技向善，心中長存咕咕雞 Zanna 的正義雷射',
    subtitle: '至高誓言：勸你善良！',
    description: '金融科技的終極奧義，是運用科技弭平資訊不對稱、降低交易摩擦、讓全世界更多弱勢群體享有公平透明的金融服務。若貪婪蒙蔽了心智，Zanna 的超載正義雷射將隨時降臨！',
    satiricalNote: '「咯咯咯！善良不是口號，是每一行合約代碼裡的良心！」—— 咕咕雞 Zanna',
    reformedBy: '全體醒悟社員',
    unlocked: false,
  },
];

export interface EnemyTemplate {
  type: 'crypto_gambler' | 'pyramid_senior' | 'ppt_vaporware' | 'leek_officer' | 'boss_president';
  name: string;
  avatarIcon: string;
  quotePool: string[];
  repentQuotePool: string[];
  ruleIdUnlock: number;
  baseGreed: number;
  speed: number;
  radius: number;
  color: string;
  points: number;
  fundDrop: number;
}

export const ENEMY_TEMPLATES: Record<string, EnemyTemplate> = {
  crypto_gambler: {
    type: 'crypto_gambler',
    name: '槓桿賭徒幹部',
    avatarIcon: '🪙',
    quotePool: [
      'To the moon! 100倍槓桿開滿！',
      '學弟把生活費借我，明天翻倍還你！',
      '跌了是洗盤，漲了是我神算！',
      '睡什麼睡！凌晨四點還有非農數據！',
    ],
    repentQuotePool: [
      '我錯了！我不炒空氣幣了！乖乖定期定額！',
      '原來踏實寫扣才是真本事，嗚嗚！',
      '社長我再也不敢把便當錢拿去開合約了！',
    ],
    ruleIdUnlock: 1,
    baseGreed: 70,
    speed: 1.45,
    radius: 20,
    color: '#F59E0B',
    points: 100,
    fundDrop: 1500,
  },
  pyramid_senior: {
    type: 'pyramid_senior',
    name: '假實習老鼠會學長',
    avatarIcon: '👔',
    quotePool: [
      '加入我團隊，大一月入十萬開保時捷！',
      '先買三萬塊內部教材，這是對自己的投資！',
      '下線拉滿三個，你就是社團合夥人！',
      '名額只剩最後兩位，別說學長沒照顧你！',
    ],
    repentQuotePool: [
      '對不起！我這就去退掉直銷合約！',
      '我會老老實實投履歷實習，不再拉學弟下線了！',
      '良心好痛... 感謝 Zanna 雞仙度化！',
    ],
    ruleIdUnlock: 4,
    baseGreed: 130,
    speed: 1.15,
    radius: 22,
    color: '#8B5CF6',
    points: 200,
    fundDrop: 3200,
  },
  ppt_vaporware: {
    type: 'ppt_vaporware',
    name: 'PPT空頭話術總監',
    avatarIcon: '📊',
    quotePool: [
      'Web3 + AI Agent + 量子DeFi，估值十億！',
      '產品還沒做？沒關係，白皮書寫炫一點就行！',
      '用黑話唬住評審，補助款就到手了！',
      '這是革命性底層協議，你不懂就閉嘴！',
    ],
    repentQuotePool: [
      '我懺悔！我現在就去學寫真實智能合約！',
      '再也不用假PPT騙校務補助款了！',
      '真正的好專案不需要一堆黑話包裝！',
    ],
    ruleIdUnlock: 5,
    baseGreed: 190,
    speed: 0.95,
    radius: 24,
    color: '#EC4899',
    points: 300,
    fundDrop: 5000,
  },
  leek_officer: {
    type: 'leek_officer',
    name: '割韭菜操盤副社長',
    avatarIcon: '🥷',
    quotePool: [
      '韭菜割一茬長一茬，社團招新就是為了這！',
      '內部消息：今晚八點莊家拉盤，快接！',
      '這隻新幣發行量十億顆，我們佔八成！',
      '誰敢在群裡質疑我，立刻踢出社團群組！',
    ],
    repentQuotePool: [
      '痛改前非！我把鎖倉的代幣全銷毀！',
      '社員不是韭菜，社員是未來的金融棟樑！',
      'Zanna 的雷射照亮了我骯髒的靈魂！',
    ],
    ruleIdUnlock: 2,
    baseGreed: 280,
    speed: 0.85,
    radius: 26,
    color: '#EF4444',
    points: 450,
    fundDrop: 8800,
  },
  boss_president: {
    type: 'boss_president',
    name: '爆倉貪婪前社長·查爾斯',
    avatarIcon: '👑',
    quotePool: [
      '金融科技社由我說了算！我是未來的華爾街之王！',
      '社費兩百萬全買迷因幣怎麼了？這是社團基金多元配置！',
      '沒有人能審計我的帳本！我是去中心化神祇！',
      '吃我的爆倉滅頂死光吧！咕咕雞休想動搖我的帝國！',
    ],
    repentQuotePool: [
      '嗚哇哇哇！我錯了！我把社費兩百萬全數歸還！',
      '我不當韭菜收割機了，我要去當鄉村金融志工！',
      '我願日夜跪在社辦默背金科社正義十誡！',
    ],
    ruleIdUnlock: 3,
    baseGreed: 950,
    speed: 0.6,
    radius: 38,
    color: '#D97706',
    points: 2000,
    fundDrop: 50000,
  },
};
