// Need more Improvement on the JS code 

const server = 'php/server.php';

$('document').ready(function () {
    addFunctionFilter();
    getItems();
    $('form').submit(function(e){
        if($('#function').attr('name')=='add'){
            addNew();
            togglePopUp();
        }else if($('#function').attr('name')=='edit'){
            edit();
            togglePopUp();
        }
        e.preventDefault();
    })
});
function getItemsWithDate() {
    let date = $('.filterInput').val();
    $.get(server,'filter='+date,function (data) {
        clearTable();
        jsonToTable(data);
        addEditFunction();
        addDeleteFunction();
        data = JSON.parse(data);
        if(data.length==0){
            showMessage('No Records Found','fail');
        }else{
            showMessage('Found '+ data.length + ' Records');
        }
    })
}
function addFunctionFilter() {
    $('.filterInput').on('change',function () {
        getItemsWithDate();
    })
}
function getItems() {
    $.get(server,function (data) {
        clearTable();
        jsonToTable(data);
        addEditFunction();
        addDeleteFunction();
        $('.filterInput').val('');
    })
}
function showAddNew() {
    showControl('add');
    togglePopUp();
    $('input').val('');
}

function addNew() {
    $.post(server,$('form').serialize(),function (data) {
        checkError(data,'Add');
    })
}
function addEditFunction(){
    $('.editBtn').on('click',function () {
        showEdit();
        data = $(this).parents()[1];
        data = $(data).html().replace(/<\/td><td>|<td>|<button.+/g,' ');
        data = data.replace('$ ','');
        data = data.trim().split(' ');
        let index = 1;
        for(element of $('form input').not(':last-child')){
            if(index<4){
                $(element).val(data[index]);
            }else{
                $(element).val(data[index] +'T'+ data[++index]);
                break;
            }
            index++;
        };
        $('#function').attr('value',$(this).attr('data-id'));
    });
}

function showEdit(){
    togglePopUp();
    showControl('edit');
}

function edit() {
    $.post(server,$('form').serialize(),function (data) {
        checkError(data,'Update');
    })
}
function addDeleteFunction() {
    $('.deleteBtn').on('click',function () {
        let id = $(this).attr('data-id');
        showPromptDelete(id);
    })
}
function showPromptDelete(id) {
    toggleMessageBox();
    $('.confirmBtn').attr('data-id',id);
    deleteItem();
}

function deleteItem() {
    $('.confirmBtn').on('click',function () {
        id = $(this).attr('data-id');
        $.post(server,'delete=&id='+id,function (data) {
            checkError(data,'Delete');
            $('.messageBoxBackground').hide();
        })
    })
}

function clearTable() {
    $('tbody').empty();
}

function jsonToTable(json) {
    json = JSON.parse(json);
    for(let val of json){
        $('<tr>' +
            `<td>${val.id}</td>`+
            `<td>${val.item}</td>`+
            `<td>${val.extra}</td>`+
            `<td>$ ${val.price}</td>`+
            `<td>${val.date_time}</td>`+
            `<td><button data-id="${val.id}" class="btn editBtn">Edit</button> <button data-id="${val.id}" class="btn deleteBtn">Delete</button></td>`+
            '</tr>').appendTo($('tbody'));
    }
}
function showControl(element) {
    if(element=='add'){
        $('#function').attr('name','add');
        $('#function').attr('value','');
        $('.addControl').show();
        $('.editControl').hide();
    }else{
        $('#function').attr('name','edit');
        $('.addControl').hide();
        $('.editControl').show();
    }
}

function checkError(data,message) {
    if(data=='success'){
        showMessage(message +' Success')
        getItems();
    }else{
        showMessage(message +' Failed','fail');
    }
}

function showMessage(message,status='success') {
    if(status=="success"){
        $('.messageSuccuess').removeClass('success');
        $('.messageSuccuess').removeClass('fail');
        $('.messageSuccuess').addClass('success');
    }else if(status=='fail'){
        $('.messageSuccuess').removeClass('fail');
        $('.messageSuccuess').removeClass('success');
        $('.messageSuccuess').addClass('fail');
    }

    $('.messageSuccuess p').text(message);
    $('.messageSuccuess').fadeIn(200,function () {
        $('.messageSuccuess').fadeOut(2000);
    });

}

function togglePopUp(option='default') {
    if(option!=='default'){
        $('.popUpBackground').fadeTo(200,0,function(){
            $('.popUpBackground').toggle();
            $('.popUpBackground').css('opacity','1');
        });
    }else{
        $('.popUpBackground').toggle();
    }
}
function toggleMessageBox(option = 'default') {
    if(option!=='default'){
        $('.messageBoxBackground').fadeTo(200,0,function(){
            $('.messageBoxBackground').toggle();
            $('.messageBoxBackground').css('opacity','1');
        });
    }else{
        $('.messageBoxBackground').toggle();
    }
}


