var UI = UI || {};

// ui id define
UI.WINDOW_ID_UNDEFINED = "";
UI.WINDOW_MAIN_LAYER_ID = "GameCCB/W_MainLayer";
UI.WINDOW_FIGHT_LAYER_ID = "GameCCB/W_FightLayer";
UI.WINDOW_FRAG_COMBINE_ID = "GameCCB/W_FragCombine";
UI.WINDOW_ENTER_BATTLE_LAYER_ID = "GameCCB/W_EnterBattleLayer";
UI.WINDOW_CARD_MANAGER_ID = "GameCCB/W_CardManager";
UI.WINDOW_CARD_DETAIL_ID = "GameCCB/W_CardDetail";
UI.WINDOW_SMALL_MAP = "GameCCB/W_SmallMap";
UI.WINDOW_BIG_MAP = "GameCCB/W_BigMap";

// widget id define
UI.WIDGET_CARD_LIST2 = "UICom/C_CardList2";
UI.WIDGET_CHAR_INFO = "UICom/C_CharInfo";
UI.WIDGET_FABAO_LIST = "UICom/C_FabaoList";
UI.WIDGET_FIGHT_SUMUP = "UICom/C_Fight_Sumup";
UI.WIDGET_FIGHT_BTON = "UICom/C_FightBton";
UI.WIDGET_FIGHT_CARD = "UICom/C_FightCard";
UI.WIDGET_GUIDE_BAR = "UICom/C_GuideBar";
UI.WIDGET_HP = "UICom/C_HP";
UI.WIDGET_ITEM_BTON = "UICom/C_ItemBton";
UI.WIDGET_ITEM_LIST = "UICom/C_ItemList";
UI.WIDGET_LEVEL_NODE = "UICom/C_LevelNode";
UI.WIDGET_NORMAL_CARD = "UICom/C_NormalCard";
UI.WIDGET_POWER = "UICom/C_Power";
UI.WIDGET_PROP_LIST = "UICom/C_PropList";
UI.WIDGET_ROAD = "UICom/C_Road";
UI.WIDGET_SKILL_LIST = "UICom/C_SkillList";
UI.WIDGET_SMALL_MAP = "UICom/C_SmallMap";

// priority define
UI.WINDOW_PRIORITY = cc.MENU_HANDLER_PRIORITY;
UI.WINDOW_BLOCK_PRIORITY = UI.WINDOW_PRIORITY + 1;
UI.SCROLL_VIEW_PRIORITY = UI.WINDOW_PRIORITY;

// ui background define
UI.BG_DA_NAO_TIAN_GONG = "danaotiangong"
UI.BG_CHANG_AN_CHENG = "changancheng"
var ui_bg_path = [
    [UI.BG_DA_NAO_TIAN_GONG, "UI/Map/map_danaotiangong.png"],
    [UI.BG_CHANG_AN_CHENG, "UI/Map/map_changancheng.png"],
];