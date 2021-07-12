
function main(){

    document.addEventListener("DOMContentLoaded",()=>{

        const mataUangAsal = document.querySelector("#mataUangAsal");
        const mataUangTujuan = document.querySelector("#mataUangTujuan");
        const buttonOK = document.querySelector("#buttonOK");
        const buttonReset = document.querySelector("#buttonReset");
        const nominalAsal = document.querySelector("#nominalAsal");
        const konversi = document.querySelector("#konversi");
        const hapus = document.querySelector("#hapus");

        document.querySelector("#nominalAsal").value = 1;

        buttonOK.addEventListener("click",()=>{

            document.querySelector("#containerHasil").style.display = "block";

            document.querySelector("#mataUang").innerHTML = mataUangAsal.value;

            document.querySelector("#mataUangHasil").innerHTML = mataUangTujuan.value;

            document.querySelector("#nominalAsal").value = 1;
            
            fetch("https://api.exchangeratesapi.io/latest")
                .then(response =>{
                    return response.json();
                })
                .then( responseJson => {
                    return responseJson.rates;
                })
                .then( rates => {
                    document.querySelector("#kurs").innerHTML = (Number(eval(`rates.${mataUangTujuan.value}`))/Number(eval(`rates.${mataUangAsal.value}`)));
                    return console.log(rates);
                })
                .catch( (error="something`s wrong") => {
                    console.log(error);
                });
                
        });

        buttonReset.addEventListener("click",()=>{
            document.querySelector("#containerHasil").style.display = "none";
            mataUangAsal.value = "Choose...";
            mataUangTujuan.value = "Choose...";
        });

        konversi.addEventListener("click",()=>{

            let nominalAsal = document.querySelector("#nominalAsal").value
            console.log(nominalAsal);

            document.querySelector("#kurs").innerHTML *= nominalAsal;
        });
        
        hapus.addEventListener("click", ()=> {

            document.querySelector("#nominalAsal").value = 0;
            fetch("https://api.exchangeratesapi.io/latest")
                .then(response =>{
                    return response.json();
                })
                .then( responseJson => {
                    return responseJson.rates;
                })
                .then( rates => {
                    document.querySelector("#kurs").innerHTML = (Number(eval(`rates.${mataUangTujuan.value}`))/Number(eval(`rates.${mataUangAsal.value}`)));
                    return console.log(rates);
                })
                .catch( (error="something`s wrong") => {
                    console.log(error);
                });
        });

        function render(datas){
            const ul = document.querySelector("ul");
            ul.innerHTML = "";
    
            datas.forEach(data => {
                if( data[0] !== "IDR"){
                    ul.innerHTML += `<li> ${data[0]} : ${data[1]} </li>`;
                }
            });
        }
    
        function ambilData(){
    
            fetch("https://api.exchangeratesapi.io/latest")
            .then( response => response.json())
            .then( responseJson => responseJson.rates)
            .then( rates => Object.entries(rates))
            .then( data => render(data))
            .catch( error => `we have an error : ${error}`);
        }
    
        document.querySelector("#refresh").addEventListener("click",()=>{
            ambilData();
        });
    
        ambilData();
        
    });

}

export default main;