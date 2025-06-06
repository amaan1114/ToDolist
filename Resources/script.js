$(document).ready(function () {
    var text=''

    //edit button working and changing into text field
    $(".edit").click(function(){
        const label =  $(this).closest(".taskcard").find(".editable")
        text = label.text()
        $(this).closest(".taskcard").removeClass("bg-light").addClass("bg-dark");
        $(this).closest(".taskcard").find('.check').hide()
        $(this).closest(".taskcard").find('.delete').hide()  
        $(this).closest(".taskcard").find(".edit").hide()
        $(this).closest(".taskcard").find('.submit-edit').show()    
        input = $('<input type="text" class="editable inputField" value="' + text + '">')
        
        label.replaceWith(input);
        input.focus();
        const len = input.val().length;
        input[0].setSelectionRange(len, len);

    })   


    //changing back to label when editted the text.
    $(".submit").click(function () { 
        if($(this).closest(".taskcard").find(".editable").val() && $(this).closest(".taskcard").find(".editable").val().trim() !==''){
            const input = $(this).closest(".taskcard").find(".editable");
            const text = input.val();
            const label = $('<label class="editable">').text(text);
            
            $(this).closest(".editable").removeClass("inputField")
            $(this).closest(".taskcard").removeClass("bg-dark").addClass("bg-light");
            $(this).closest(".taskcard").find('.check').show()
            $(this).closest(".taskcard").find('.delete').show()
            $(this).closest(".taskcard").find('.edit').show()

            $(this).closest(".taskcard").find('.submit-edit').hide()  
            $(this).closest(".taskcard").find('.submit-edit').find('.text_editting').val(text);  
            input.replaceWith(label);

        }
        
        
    });
});

