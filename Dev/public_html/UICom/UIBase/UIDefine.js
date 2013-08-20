var UI = UI || {};

// ui id define
UI.UI_ID_UNDEFINED = "";
UI.MAIN_LAYER_ID = "GameCCB/W_MainLayer";
UI.FIGHT_LAYER_ID = "GameCCB/W_FightLayer";
UI.PLAYER_BAG_ID = "GameCCB/W_PlayerBag";
UI.ENTER_BATTLE_LAYER_ID = "GameCCB/W_EnterBattleLayer";
UI.CARD_MANAGER_ID = "GameCCB/W_CardManager";
UI.CARD_DETAIL_ID = "GameCCB/W_PlayerBag";
UI.SMALL_MAP = "GameCCB/W_SmallMap";

// priority define
UI.WINDOW_PRIORITY = cc.MENU_HANDLER_PRIORITY;
UI.WINDOW_BLOCK_PRIORITY = UI.WINDOW_PRIORITY + 1;
UI.SCROLL_VIEW_PRIORITY = UI.WINDOW_PRIORITY;

// ui background define
UI.DA_NAO_TIAN_GONG = "danaotiangong"
UI.CHANG_AN_CHENG = "changancheng"
var ui_bg_path = [
    [UI.DA_NAO_TIAN_GONG, "UI/Map/map_danaotiangong.png"],
    [UI.CHANG_AN_CHENG, "UI/Map/map_changancheng.png"],
];