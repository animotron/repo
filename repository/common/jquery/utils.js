function gatherFieldsValue(formId, fieldId) {
	var query = "&searchBy="+fieldId;
    $("#"+formId+" input").each(function() {{
        var id = $(this).attr("id");
        if(id.indexOf("hidden") == 0)
            query += "&"+$(this).attr("name")+"="+$(this).val();
    }});
    return query;
}

function newInstance(instanceType, inputId) {
    $.ajax({
        url:"/an:part-generator-service/an:"+instanceType,
        dataType:'text',
        type:'GET',
        success:function(data){
            $("#hidden_"+inputId).val($(data).find("id").text());
            
            $("#label_"+inputId).remove();
            $("#"+inputId).remove();
            $("#new_"+inputId).remove();
            
            $("#div_"+inputId).html($(data).find("fieldset"));
        }
    });
}