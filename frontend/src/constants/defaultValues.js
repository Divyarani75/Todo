let data;
if(process.env.NODE_ENV === 'development'){
	data = "http://localhost:8000/";
}else{
  data = "http://localhost:8000/";
}
export const serviceData = data;
