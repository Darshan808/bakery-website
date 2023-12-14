export function generateSignature(amount) {
  var currentTime = new Date();
  var formattedTime =
    currentTime.toISOString().slice(2, 10).replace(/-/g, "") +
    "-" +
    currentTime.getHours() +
    currentTime.getMinutes() +
    currentTime.getSeconds();
  amount = 1;
  document.getElementById("transaction_uuid").value = formattedTime;
  document.getElementById("total_amount").value = amount.toString();
  document.getElementById("amount").value = amount.toString();
  var total_amount = amount.toString();
  var transaction_uuid = document.getElementById("transaction_uuid").value;
  var product_code = document.getElementById("product_code").value;
  var secret = document.getElementById("secret").value;

  var hash = CryptoJS.HmacSHA256(
    `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`,
    `${secret}`
  );
  var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
  document.getElementById("signature").value = hashInBase64;
}
