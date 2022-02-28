{
  // console.log($(".list"));
  let resultsForm = $(".result-form");

  // console.log(resultPass);
  for (let i = 0; i < resultsForm.length; i++) {
    // console.log(resultsForm[i]);
    // console.log($(`.${resultsForm[i].className} > .save-result`));
    $(resultsForm[i].children[2]).on("click", function (e) {
      e.preventDefault();
      // console.log(resultsForm[i].children[1].value);
      // console.log(resultsForm[i].action);
      $.ajax({
        type: "post",
        url: `${resultsForm[i].action}/?id=${$(resultsForm[i].children[1]).attr(
          "data-id"
        )}&result=${resultsForm[i].children[1].value}`,
        success: function (data) {
          // console.log(data.result);
          let resultList = $("li");
          $(".display-result", resultList[i]).html(data.result);
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  }
}
