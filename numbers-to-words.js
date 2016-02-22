/****************words of numbers************************/
var namesSP=[
				['un','dos','tres','cuatro','cinco','seis','siete','ocho','nueve'],
				['once','doce','trece','catorce','quince','diesciseis','diecisiete','dieciocho','diecinueve'],
				['diez','veinte','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa','veinti']
			];

	var namesEN = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
	var namesEN_dec = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];


/****************functions************************/
function NumbersToWords(language,number){
		if(typeof language == 'string')language = language.toLowerCase();
		else return "language undefined! (write 'sp' or 'en')";

		if(language == "sp" || language == "spanish"  || language == "español")
			return spanishConvertion(number);
		else if(language == "en" || language == "english" || language == "ingles")
			return englishConvertion(number);
		else
			return "language undefined! (write 'sp' or 'en')";
	}

function spanishConvertion(numberNumeral){
	//validate if the number is different of number
	if(isNaN(numberNumeral)){
		return "Its not a number!";
	}
	//validate if the value is empty
	if(numberNumeral.length == 0){
		return 0;
	}
	//convert to parse
	numberNumeral= parseFloat(numberNumeral);
	console.log(numberNumeral);
	var number = Math.floor(numberNumeral);//get the integer number
	number = number.toString().split('').reverse();//conver to to array and get reverse
    var decimal= numberNumeral.toString().split('.')[1];


    var  result=['','','','',''];//the index of array is: 0:unit, 1: ten, 2: centenas, 3:miles

    if(number.length == 1 && number[0]==1)
        return result= "uno";
    if(number.length == 1 && number[0]==0)
        return result= "cero";

    if(number[1] != 1)
        result[0]=getUnit(number);

    if(number.length > 1) {
        result[1] = getTen(number);
        if (number[1] == 2)
            result[0] = '';
    }

    if(number.length>2)
        result[2]=getHundred(number);

    if(number.length>3 )
        result[3]=getThousand(number);

    if(number.length>6)
        result[4]=getMillion(number);

   // var resultDecimal=getDecimal(decimal);
    result = (result.reverse().join("")+" "+getDecimal(decimal)).trim();
    var newResult=result[0].toUpperCase();
    newResult+=result.slice(1,result.length);

    return newResult;
}

function getUnit(number){//return the first number in literal (0-9)
    if(number[0] == 0)
        return "";
    else
        return namesSP[0][parseInt(number[0])-1];
}

function getTen(number){//the number its an array reverse
    if(number[1] == 0)
        return "";
    if(number[1] == 1)
        if(number[0] == 0)
            return namesSP[2][0];//return "diez"
        else
            return  namesSP[1][number[0]-1];//return "once, doce, trece....."
    else{
        var result="";
        if(number[1]==2 && number[0]!=0){
            result = namesSP[2][9];
            result+=namesSP[0][number[0]-1];
        }
        else{
            result=namesSP[2][number[1]-1];
            if(number[0]!=0)
                result += " y ";
        }
        return result
    }
}

function getHundred(number){//the number its an array reverse
    if(number[2] == 0)
        return "";
    if(number[2] == 1 && number[1] == 0 && number[0]==0)
        return "cien";
    else{
        if(number[2]==5) return "quinientos ";
        if(number[2]==7) return "setecientos ";
        if(number[2]==9) return "novecientos ";
        if(number[2]==1)
            return "ciento ";
        else
            return getUnit(number[2])+"cientos ";
    }
}

function getThousand(number){ //the number its an array reverse
    if(number[3]==0 && number[4]==0 && number[5]==0)
        return "";
    // if(number[3]==1)
    //    return "mil";
    //else{
    var thousandNumber="";
    if(number.length<6)
        thousandNumber=number.slice(3,6);
    else
        thousandNumber= number.slice(3,number.length);

    var result=['','',''];

    if(thousandNumber[1]!=1)
        result[0]=getUnit(thousandNumber);

    if(thousandNumber.length>1) {
        result[1] = getTen(thousandNumber);
        if (thousandNumber[1] == 2)
            result[0] = '';
    }
    if(thousandNumber.length>2){
        result[2]=getHundred(thousandNumber);
    }
    return [result[2], result[1], result[0], 'mil '].join(' ');
    //}
}

function getMillion(number){ //console.info(number);
    //if(number[3]==0 && [])
    //    return "";
    if(number[6]==1)
        return "unmill&oacuten";
    else{
        var millionNumber="";
        if(number.length<6)
            millionNumber=number.slice(6,9);
        else
            millionNumber= number.slice(6,number.length);

        var result=['','',''];console.info(millionNumber);

        if(millionNumber[1]!=1)
            result[0]=getUnit(millionNumber);

        if(millionNumber.length>1) {
            result[1] = getTen(millionNumber);
            if (millionNumber[1] == 2)
                result[0] = '';
        }
        if(millionNumber.length>2){
            result[2]=getHundred(millionNumber);
        }
        return result[2]+' '+result[1]+' '+result[0]+"millones ";
    }
}

function getDecimal(decimal){
		//validate if the number is different of number
		if(isNaN(decimal) || decimal.length == 0){
			return "";
		}
		return ("coma " + spanishConvertion(decimal)).toLowerCase();
}

function englishConvertion (num) {
	var n;
	num = parseFloat(num);
	console.log(num);
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (namesEN[Number(n[1])] || namesEN_dec[n[1][0]] + ' ' + namesEN[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (namesEN[Number(n[2])] || namesEN_dec[n[2][0]] + ' ' + namesEN[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (namesEN[Number(n[3])] || namesEN_dec[n[3][0]] + ' ' + namesEN[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (namesEN[Number(n[4])] || namesEN_dec[n[4][0]] + ' ' + namesEN[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (namesEN[Number(n[5])] || namesEN_dec[n[5][0]] + ' ' + namesEN[n[5][1]])  : '';
    return str;
}
