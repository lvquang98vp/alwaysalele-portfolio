export const services = [
  {id:'pet-full', title:'Drawing of pet simple background / full body / full render', short:'Full body pet portrait', category:'PETS', price:80, extra:70, images:['98bc567d-5487-4cba-bf5c-bd34f05138c5','c0851392-a8fe-40bd-8202-51a589b49f0b','4f225986-6ba8-4823-b86a-6a6b35c8c04e'], description:'A fully rendered portrait of your pet with a simple, single-color background.', minRefs:4},
  {id:'watercolor',title:'Watercolor Style pet drawing',short:'Watercolor style pet drawing',category:'PETS',price:40,extra:30,images:['e3a0ff73-88a7-4932-b6b6-c54fa6952a8f','2b81eb69-83a5-4b65-882c-ab3de5b81fb4'],description:'A soft, expressive watercolor-style portrait of your favorite companion.',minRefs:4},
  {id:'pet-scene',title:'Pet drawing complex background full render / full body',short:'Pet portrait with a detailed background',category:'PETS',price:95,extra:85,images:['2d7b6e21-dba1-417a-b9b9-137295489b95','a1684772-984f-42df-a421-c59f8135a901','a94eab9d-55d6-4c02-83a4-93dc3d26878e'],description:'A fully rendered, full body pet portrait in a custom illustrated setting. The final price depends on background complexity.',minRefs:4},
  {id:'pet-half',title:'Drawing of pet Simple Background / full render / half body',short:'Half body pet portrait',category:'PETS',price:60,extra:50,images:['50ed8c57-b344-4620-bb77-a109c3287b90','3e039007-4784-4a2a-ae83-ac3227fe3457'],description:'A fully rendered half body portrait with a simple background.',minRefs:4},
  {id:'chibi',title:'Chibi Full Body',short:'Chibi Full Body',category:'Other',price:65,extra:50,images:['7266ff74-cd35-418c-ab6f-03f3a3d7cb8d'],description:'Your character as an adorable full body chibi. Includes high-definition artwork in ZIP and Drive format.',minRefs:2},
  {id:'icon',title:'CHIBI ICON',short:'CHIBI ICON',category:'Other',price:35,extra:30,images:['253fd675-97db-4c10-8ccc-eb593fd2e7d1'],description:'A cute chibi icon with a single-color background. Includes high-definition artwork in ZIP and Drive format.',minRefs:2},
  {id:'pngtuber',title:'PNG TUBER',short:'PNG TUBER',category:'Other',price:45,extra:0,images:['b9682aff-daa3-4fdd-b21c-1dd360497adf','0ac4d202-b9cf-4c15-868d-e6a41d81317e','16a59c18-bcad-4e11-a6f1-8056a1a2875b','4427f686-e3dc-407a-b933-5767526c3eb1','5ed38f27-cba1-4b52-8a01-47c4ee8cb315','6011084d-a802-4571-aa5a-f4c79135c632'],description:'Open and closed mouth PNGs for your stream. Choose a Popcat breed or send detailed character references. No extra fee for content creation. Listed from $45; the source description quotes $40–$65 depending on detail. A final quote is required.',minRefs:2},
];
export type Service = typeof services[number];
export const artworks = [
 {id:'commission-pets',title:'Commission petss',image:'66b12bec-69c2-4b72-9855-9fe96fc16e17',tags:['pet portrait','illustration'],commission:true,description:'Commission for two pets with background included <3'},
 {id:'flowers',title:'my cat and the flowers',image:'068c8fb9-8720-4278-abed-476719a021e7',tags:['cat','pet painting'],commission:false},
 {id:'catradora',title:'Catradora Chibi',image:'7d4ca08d-1ee8-4d0f-8f4c-b83246880f5b',tags:['chibi','illustration'],commission:false},
 {id:'yasper',title:'Yasper',image:'fd437843-29c1-4fe6-8da2-56ca9dca1f4c',tags:['cat','pet portrait'],commission:false},
 {id:'snow',title:'cat in the snow',image:'d00cbcaf-4f37-414b-ae51-1a099c9f59a8',tags:['cat','pet painting'],commission:false},
 {id:'dylan',title:"dylan’s CHIBI ICON",image:'86ba8315-9a00-492d-9d26-871000381397',tags:['chibi','illustration'],commission:true},
 {id:'chibi-icon',title:'Chibi icon commission1',image:'adb7b327-a79b-413f-bfd3-8ba5680963da',tags:['chibi','illustration'],commission:false},
 {id:'wilson',title:'Wilson',image:'7bc6a80d-0bd3-4cb0-bcf5-efe95c541e39',tags:['cat','pet portrait'],commission:false},
 {id:'cat-portrait',title:'Cat Portrait',image:'73e94ecb-be78-4043-bcce-38a4da9d8484',tags:['cat','pet portrait'],commission:false},
];
export function estimate(service:Service, count:number, format:string, background:boolean) {
 if(service.id==='watercolor') return (format==='full'?60:40)+(count-1)*(format==='full'?55:30)+(background?10:0);
 return service.price+(count-1)*service.extra;
}
