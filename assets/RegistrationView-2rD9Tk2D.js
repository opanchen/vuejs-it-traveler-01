import{B as c,o as u,h as d,b as t,w as f,d as g,v as _,G as V,C as b,k as l,t as w,n as v,F as x,D as S}from"./index-tHUhZOps.js";import{_ as m,u as y}from"./IInput-KTCbTgY7.js";import{_ as R}from"./IButton-Dedl3nyQ.js";const U={__name:"RegistrationForm",props:{isLoading:{default:!1,type:Boolean}},emits:["submit"],setup(p,{emit:n}){const r=p,o=n,e=c({name:"",email:"",password:""});return(i,a)=>(u(),d("form",{onSubmit:a[3]||(a[3]=_(s=>o("submit",V(e)),["prevent"]))},[t(m,{class:"mb-4",label:"Повне імʼя",modelValue:e.name,"onUpdate:modelValue":a[0]||(a[0]=s=>e.name=s)},null,8,["modelValue"]),t(m,{class:"mb-4",label:"Електронна пошта",placeholder:"john.doe@mail.com",modelValue:e.email,"onUpdate:modelValue":a[1]||(a[1]=s=>e.email=s)},null,8,["modelValue"]),t(m,{label:"Пароль",type:"password",placeholder:"******",modelValue:e.password,"onUpdate:modelValue":a[2]||(a[2]=s=>e.password=s)},null,8,["modelValue"]),t(R,{class:"mt-10 w-full",variant:"gradient",type:"submit","is-loading":r.isLoading},{default:f(()=>[g("Створити акаунт")]),_:1},8,["is-loading"])],32))}},k={key:0,class:"text-red-500"},h={__name:"RegistrationView",setup(p){const n=b(),{isLoading:r,error:o,mutation:e}=y({mutationFn:i=>S.registerUser(i),onSuccess:()=>n.replace("/map")});return(i,a)=>(u(),d(x,null,[t(U,{onSubmit:l(e),"is-loading":l(r)},null,8,["onSubmit","is-loading"]),l(o)?(u(),d("p",k,w(l(o).message),1)):v("",!0)],64))}};export{h as default};
