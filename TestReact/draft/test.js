function excelFileToJSON(file) {
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function (e) {

        var data = e.target.result;
        var workbook = XLSX.read(data, { type: 'binary' });
        var result = {};
        var worksheet = workbook.Sheets['Full_View'];
        var data = XLSX.utils.sheet_to_json(worksheet);
        //displaying the json result
        var resultEle = document.getElementById("json-result");
        resultEle.value = JSON.stringify(result, null, 4);
        resultEle.style.display = 'block';
    };
}