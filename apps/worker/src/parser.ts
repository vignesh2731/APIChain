export function parse(text:string,values:any){
  let res = "";
  for(let i = 0 ; i < text.length;i++){
    if(text[i] === '{'){
      let j = i+1;
      while(text[j] !== '}'){
        j++;
      }
      let keys = text.slice(i+1,j);
      let key = keys.split(".");
      let value = {...values};
      for(let k = 0 ; k < key.length;k++){
        if(value===undefined || value===null && key[k]!=null)break;
        if(typeof value === 'string')value=JSON.parse(value);
        //@ts-ignore
        value = value[key[k]] ?? " ";
      }
      res+=value;
      i = j;
    }
    else{
      res+=text[i];
    }
  }
  return res;
}