import React from 'react';
import { StyleSheet, Text, View, ScrollView, Picker } from 'react-native';
import LabelSelect from 'react-native-label-select';

class SingleMenu extends React.Component {
   constructor(props){
      super(props);
   }
   render(){
      let itemList = this.props.items;
      let key = 0;
      let selectedItem = "";
      pickerItem = itemList.map(function(item){
         name = item.name;
         if(item.selected===true){
            selectedItem = item.name;
         }
         key++;
         return(<Picker.Item label={name} value={name} key={key}/>)}
      );
      return(
         <View style={styles.singlemenu}>
            <View>
               <Text style={{fontSize: 20}}>{this.props.title}</Text>
            </View>
            <View>
               <Picker 
                  selectedValue={selectedItem}
                  onValueChange={(itemValue,itemIndex) => this.props.afterSelect(itemValue)}>
               {pickerItem}
               </Picker>
            </View>
         </View>
      )
   }
}


class MultiMenu extends React.Component {
   constructor(props){
      super(props);
   }

   render(){
      let itemList = this.props.items;
      key=0
      multipleSelectItem = itemList.map(function(item){
         name = item.name;
         key++;
         return({name: name, id: key})}
      );
      let selectedItems = itemList.filter(item => item.selected == true);
      let notselectedItems = itemList.filter(item => item.selected != true);
      let afterCancel = this.props.afterCancel;
      let Label = selectedItems.map(function(item){
                     let fun = () => afterCancel(item.name);
                     return(<LabelSelect.Label
                              key={item.name}
                              data={item}
                              onCancel={fun}> {item.name}</LabelSelect.Label>)
                  })

      let ModalItem = notselectedItems.map(function(item){
                     return(<LabelSelect.ModalItem
                        key={item.name}
                        data={item} > {item.name}</LabelSelect.ModalItem>)
                        })
      return(
         <View style={styles.multimenu}>
            <ScrollView>
               <View>
               <Text style={{fontSize:20}}>{this.props.uniqueKey}</Text>
               </View>
               <View>
               <LabelSelect
                  title={this.props.uniqueKey}
                  ref="labelSelect"
                  confirmText="Confirm"
                  cancelText="Cancel"
                  onConfirm={(list) => this.props.afterSelect(list)}>
               {Label}
               {ModalItem}
               </LabelSelect>
               </View>
            </ScrollView>
         </View>
      )
   }
}

class Result extends React.Component {
   constructor(props){
      super(props);
   }
   render() {
      let totalCalorie = 0;
      let totalCost = 0;
      let menu = this.props.menu;
      for(key in menu){
         let itemList = menu[key];
         for(index in itemList){
            let item = itemList[index]
            if(item.selected == true){
               if( item.calorie) totalCalorie += item.calorie;
               if( item.cost) totalCost += item.cost;
            }
         }
      }
      return(
            <View style={styles.result}>
               <Text style={{fontSize: 20, color: '#fff'}}>Total Calorie: 
                  <Text style={{fontSize: 25, color:'#f8c20d'}}> {totalCalorie} </Text>
               kcal</Text>
               <Text style={{fontSize: 20, color: '#fff'}}>Total Cost: 
               <Text style={{fontSize: 25, color:'#f8c20d'}}> {totalCost} </Text>
               yen</Text>
            </View>
            );
   }
}

const menus = {
   sandwich: [
              {name: 'ツナ', calorie: 138, cost: 430, selected:true},
              {name: '生ハムマスカルポーネ', calorie: 100, cost: 520},
              {name: 'チーズローストチキン', calorie: 133, cost: 480},
              {name: 'えびアボカド', calorie: 141, cost: 500},
              {name: 'BLT', calorie: 95, cost: 420},
              {name: 'ローストビーフ', calorie: 109, cost: 590},
              {name: '照り焼きチキン', calorie: 142, cost: 480},
              {name: 'ターキーブレスト', calorie: 45, cost: 450},
              {name: 'ローストチキン', calorie: 68, cost:420},
              {name: 'たまご', calorie: 150, cost:390},
              {name: 'アボカドベジー', calorie: 85, cost:410},
              {name: 'ベジー＆チーズ', calorie: 53, cost:340},
              {name: 'ターキーベーコンエッグ', calorie: 122, cost:450},
              {name: 'ベジーデライト', calorie: 0, cost:300},
              {name: 'チリチキン', calorie: 74, cost: 710}
               ],
   bread: [
            {name: 'ウィート', calorie: 180, selected:true},
            {name: 'ホワイト', calorie: 179},
            {name: 'セサミ', calorie: 196},
            {name: 'ハニーオーツ', calorie: 190},
            {name: 'フラットブレッド', calorie: 227}
            ],
   topping: [
      {name: 'ナチュラルスライスチーズ', calorie: 53, cost: 40},
      {name: 'クリームタイプチーズ', calorie: 64, cost: 60},
      {name: 'マスカルポーネチーズ', calorie: 51, cost: 90},
      {name: 'えび', calorie: 16, cost: 100},
      {name: 'アボカド', calorie: 81, cost:110},
      {name: 'たまご', calorie: 77, cost: 60},
      {name: 'ベーコン', calorie: 48, cost: 60},
      {name: 'ツナ', calorie: 65, cost: 80}
   ],
   vegetable: [
      {name: 'レタス',  calorie: 4},
      {name: 'トマト',  calorie: 4},
      {name: 'レッドオニオン',  calorie: 2},
      {name: 'にんじん',  calorie: 2},
      {name: 'ピーマン',  calorie: 2},
      {name: 'ピクルス',  calorie: 2},
      {name: 'オリーブ',  calorie: 2},
      {name: 'ハラペーニョ',  calorie: 2}
   ],
   dressing: [
      {name: 'オイル＆ビネガー　塩こしょう',  calorie: 24},
      {name: 'シーザー',  calorie: 39},
      {name: '野菜クリーミー',  calorie: 35},
      {name: 'わさび醤油',  calorie: 6},
      {name: 'バジル',  calorie: 24},
      {name: 'バルサミコ酢',  calorie: 29},
      {name: 'マヨネーズ',  calorie: 16},
      {name: 'ハニーマスタード',  calorie: 15},
      {name: 'チリソース',  calorie: 3},
      {name: 'ホットペッパー',  calorie: 1},
      {name: 'マスタード',  calorie: 4},
      {name: 'ランチ',  calorie: 83}
   ]
};

export default class App extends React.Component {
  constructor(props) {
     super(props);
     this.state={
        menus: menus
     }
  }

  updateSingleMenu(key, selectedItemName){
     let items = this.state.menus[key];
     nextItems = items.map(function(item){
        if(item.name == selectedItemName){
           item.selected=true;
        }
        else{
           item.selected=false;
        }
        return(item);
     })
     let nextMenu = this.state.menus;
     nextMenu[key] = nextItems;
     this.setState({menus: nextMenu})
  }

  updateMultiMenu(key, itemList){
     let items = this.state.menus[key];
     let nextItems = items.map(function(item){
                          if(itemList.includes(item)){
                             item.selected=true;
                          }
                          return item;
                       });
     let nextMenu = this.state.menus;
     nextMenu[key] = nextItems;
     this.setState({menus: nextMenu})
  }
  cancelMultiMenu(key, itemName){
     let items = this.state.menus[key];
     let nextItems = items.map(function(item){
                          if(item.name===itemName){
                             item.selected=false;
                          }
                          return item;
                       });
     let nextMenu = this.state.menus;
     nextMenu[key] = nextItems;
     this.setState({menus: nextMenu})
  }
  renderSingleMenu(itemKey){
     return(
           <SingleMenu 
              title={itemKey}
              items={this.state.menus[itemKey]}
              afterSelect={(selectedItemName) => this.updateSingleMenu(itemKey, selectedItemName)}
           ></SingleMenu>
     );
  }
  renderMultiMenu(itemKey){
     return(
           <MultiMenu 
              items={this.state.menus[itemKey]}
              afterSelect={(itemList) => this.updateMultiMenu(itemKey, itemList)}
              afterCancel={(cancelItemName) => this.cancelMultiMenu(itemKey, cancelItemName)}
              uniqueKey={itemKey}
           ></MultiMenu>
     );
  }

  render() {
    let resultBar = <Result menu={this.state.menus}></Result>;
    return (
      <View style={styles.container}>
        {resultBar}
        {this.renderSingleMenu("sandwich")}
        {this.renderSingleMenu('bread')}
        {this.renderMultiMenu('topping')}
        {this.renderMultiMenu('vegetable')}
        {this.renderMultiMenu('dressing')}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  result: {
     height: '10%',
     width: '95%',
     backgroundColor: '#1f8940',
  },
  singlemenu: {
     height: '12%',
     width: '95%',
     backgroundColor: '#fff2bd',
  },
  multimenu: {
     height: '20%',
     width: '95%',
     backgroundColor: '#fff2bd',
  }
});
