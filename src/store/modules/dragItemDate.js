import { stat } from "fs";

const state = {
  // 只用了原数据的数组  对象里增加了 'upActive': false 'downActive': false 是用来控制红色边框的出现
  layoutContentItem: [
    {
		"componentKey": "Text",
		"title": "文本000",
		"fieldId": "20181108195717mCmp5TOBfA",
		"inLeft": false,
		"required": false,
		"crux": true,
		"isTextArea": false,
		"size": "large",
		"borderColor": "",
		"bacColor": "",
		"titleFontColor": "",
		"titleFontSize": 13,
		"titleBold": false,
		"titleUnderline": false,
		"bacImg": null,
		"tips": "",
		"hideTitle": false,
		"uniqueCheck": false,
		"visible": false,
		"calculate": false,
		"calType": "2",
		"complexCal": "",
		"complexTrueVal": "",
		"numberFields": "",
		"numberFieldArr": [],
    "columncode": "wb_1541678285948866",
    'upActive': false,
    'downActive': false
  },
  {
		"componentKey": "Text",
		"title": "文本11111",
		"fieldId": "20181108195717mCmp5TOBfA",
		"inLeft": false,
		"required": false,
		"crux": true,
		"isTextArea": false,
		"size": "large",
		"borderColor": "",
		"bacColor": "",
		"titleFontColor": "",
		"titleFontSize": 13,
		"titleBold": false,
		"titleUnderline": false,
		"bacImg": null,
		"tips": "",
		"hideTitle": false,
		"uniqueCheck": false,
		"visible": false,
		"calculate": false,
		"calType": "2",
		"complexCal": "",
		"complexTrueVal": "",
		"numberFields": "",
		"numberFieldArr": [],
    "columncode": "wb_1541678285948866",
    'upActive': false,
    'downActive': false
  },
  {
		"componentKey": "Text",
		"title": "文本3333",
		"fieldId": "20181108195717mCmp5TOBfA",
		"inLeft": false,
		"required": false,
		"crux": true,
		"isTextArea": false,
		"size": "large",
		"borderColor": "",
		"bacColor": "",
		"titleFontColor": "",
		"titleFontSize": 13,
		"titleBold": false,
		"titleUnderline": false,
		"bacImg": null,
		"tips": "",
		"hideTitle": false,
		"uniqueCheck": false,
		"visible": false,
		"calculate": false,
		"calType": "2",
		"complexCal": "",
		"complexTrueVal": "",
		"numberFields": "",
		"numberFieldArr": [],
    "columncode": "wb_1541678285948866",
    'upActive': false,
    'downActive': false
  }
],
  // layoutContentItem: [{title: '1111', upActive: false, downActive: false}, {title: '2222', upActive: false, downActive: false}, {title: '3333', upActive: false, downActive: false}, {title: '44444', upActive: false, downActive: false}, {title: '55555', upActive: false, downActive: false}],
  // layoutContentItem: [{text: '1111', upActive: false, downActive: false}],
  initPositionY: 999, // 中部 开始拖动组件的 index
  positionY: 999, // 进入到哪个组件的 index
  itemIsMoving: false, // 中间布局的item 是否被拖动
  leftDragItemIsMoving: false, // 左侧的item是否被拖动
  centerDraggingItemData: '', // 保存中间拖动的组件的数据
  leftDraggingItemData: '', // 保存左侧拖动的组件的数据 
  isNeedUpdateDate: false // 是否需要更新数据
};

const actions = {
  // item = {index:1, position: 1} position 1 是上 2 是下
  updateLayoutContentItem({ commit }, item) {
    if (item) {
      var layoutContentItemLength = state.layoutContentItem.length - 1
      if (item.index > layoutContentItemLength) {
        item.index = layoutContentItemLength
      }
      commit('LAYOUT_CONTENT_ITEM', item);
    }
  },
  changeLayoutContentItem({ commit }) {
    commit('CHANGE_LAYOUT_CONTENT_ITEM');
  },
  updatePositionY({ commit }, position) {
    // var layoutContentItemLength = state.layoutContentItem.length - 1
    // if (position > layoutContentItemLength) {
    //   position = layoutContentItemLength
    // }
    commit('UPDATE_POSITION_Y', position);
  },
  updateInitPositionY({ commit }, position) {
    commit('UPDATE_INIT_POSITION_Y', position);
  },
  updateItemIsMoving({ commit }, bool) {
    commit('UPDATE_ITEM_IS_MOVING', bool);
  },
  updateLeftDragItemIsMoving({commit}, bool) {
    commit('UPDATE_LEFT_DRAG_ITEM_ISMOVING', bool);
  },
  // 中间拖动的组件的数据
  updateCenterDraggingItemData({commit}, item) {
    commit('UPDATE_CENTER_DRAGGING_ITEM_DATA', item);
  },
  // 左边拖动的组件的数据
  updateLeftDraggingItemData({commit}, item) {
    commit('UPDATE_LEFT_DRAGGING_ITEM_DATA', item);
  },
  // 是否需要触发更新数据
  updateIsNeedUpdateDate({commit}, bool) {
    commit('UPDATE_IS_NEED_UPDATE_DATA', bool);
  }
};

const getters = {
  // loginStatus: state => state.loginStatus,
  layoutContentItem: state => state.layoutContentItem,
  positionY: state => state.positionY,
  itemIsMoving: state => state.itemIsMoving,
  leftDragItemIsMoving: state => state.leftDragItemIsMoving,
  centerDraggingItemData: state => state.centerDraggingItemData,
  leftDraggingItemData: state => state.leftDraggingItemData
};

const mutations = {
  // [types.SET_USER_INFO](state, userInfo) {
  //   state.userInfo = userInfo;
  // }
  ['LAYOUT_CONTENT_ITEM'](state, item) {
    var index = item.index
    var data = state.layoutContentItem
    // item 的 position如果是 '' 就是代表要清空hover 的红边框数据
    if (!item.position) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].downActive) {
          data[i].downActive = false
        }
        if (data[i].upActive) {
          data[i].upActive = false
        }
      }
    } else {
      // 清空初始化
      for (var i = 0; i < data.length; i++) {
        if (data[i].downActive) {
          data[i].downActive = false
        }
        if (data[i].upActive) {
          data[i].upActive = false
        }
      }
      // console.log(item.position)
      if (item.position === 1 ) {
        data[index].upActive = true
        data[index].downActive = false
      } else if (item.position === 2 ){
        data[index].downActive = true
        data[index].upActive = false
      }
      state.layoutContentItem = data
    }
  },
  ['UPDATE_POSITION_Y'](state, position) {
    state.positionY = position
  },
  ['UPDATE_INIT_POSITION_Y'](state, position) {
    state.initPositionY = position
  },
  ['UPDATE_ITEM_IS_MOVING'](state, bool) {
    state.itemIsMoving = bool
  },
  ['CHANGE_LAYOUT_CONTENT_ITEM'](state) {
    // 拖动中间的组件
    if (state.centerDraggingItemData) {
      var isNeedUpdateDateIndex = ''
      for (var i = 0; i < state.layoutContentItem.length; i++) {
        if (state.layoutContentItem[i].upActive || state.layoutContentItem[i].downActive) {
          isNeedUpdateDateIndex = i
        }
      }
      // 这是拖动 临界的位置 在临界位置
      if (isNeedUpdateDateIndex == state.initPositionY) {
        state.isNeedUpdateDate = false
      }
      // 可以触发更新
      if (state.isNeedUpdateDate) {
        var data1 = state.layoutContentItem
        data1.splice(state.initPositionY, 1)
        state.layoutContentItem = data1
        var data2 = state.layoutContentItem
        for (let i = 0; i < data2.length; i++) {
          let upActive = data2[i].upActive
          let downActive = data2[i].downActive
          if (upActive) {
            state.centerDraggingItemData.upActive = false
            state.centerDraggingItemData.downActive = false
            data2.splice(i, 0, state.centerDraggingItemData)
            // 更新 positionY
            state.positionY = i
            break
          }
          if (downActive) {
            state.centerDraggingItemData.upActive = false
            state.centerDraggingItemData.downActive = false
            data2.splice(i + 1, 0, state.centerDraggingItemData)
            // 更新 positionY
            state.positionY = i + 1
            break
          }
        }
        state.layoutContentItem = data2
      }
      var data3 = state.layoutContentItem
      for (let i = 0; i < data3.length; i ++) {
          data3[i].downActive = false
          data3[i].upActive = false
      }
      state.layoutContentItem = data3
    }
    // 拖动左侧的组件
    if (state.leftDraggingItemData) {
      var title = state.leftDraggingItemData.title
      var obj = {}
      obj['title'] = title
      obj['upActive'] = false
      obj['downActive'] = false
      var data = state.layoutContentItem
      for (let i = 0; i < data.length; i++) {
        let upActive = data[i].upActive
        let downActive = data[i].downActive
        if (upActive) {
          data.splice(i, 0, obj)
          // 更新 positionY
          state.positionY = i
          break
        }
        if (downActive) {
          data.splice(i + 1, 0, obj)
          state.positionY = i + 1
          break
        }
      }
      for (let i = 0; i < data.length; i ++) {
        data[i].downActive = false
        data[i].upActive = false
      }
      state.layoutContentItem = data
    }
  },
  ['UPDATE_LEFT_DRAG_ITEM_ISMOVING'](state, bool) {
    state.leftDragItemIsMoving = bool
  },
  ['UPDATE_CENTER_DRAGGING_ITEM_DATA'](state, item) {
    state.centerDraggingItemData = item
  },
  ['UPDATE_LEFT_DRAGGING_ITEM_DATA'](state, item) {
    state.leftDraggingItemData = item
    // console.log(state.leftDraggingItemData)
  },
  ['UPDATE_IS_NEED_UPDATE_DATA'](state, bool) {
    state.isNeedUpdateDate = bool
  }
};

export default {
  state,
  actions,
  getters,
  mutations,
};
