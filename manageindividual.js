//The purpose of this file is to isolate the specific JS functions required to handle the individual pages and function in the Verint individual template.

var individualTemplateIdentifier = 'individual_template_';

function do_KDF_Ready_Individual(event, kdf) {


    console.log('do_KDF_Ready_Individual');
    if (KDF.getVal('txt_customer_id') !== '' && KDF.getVal('rad_viewmode') !== 'R' && KDF.getVal('rad_viewmode') !== 'U') {
        KDF.customdata('person-retrieve-new', individualTemplateIdentifier + 'KDF_Ready', true, true, { 'person_search_results': KDF.getVal('txt_customer_id') });
    }

    var form_name = kdf.name;

    $('#dform_' + form_name).off('click', '#dform_widget_button_but_back_create_individual').on('click', '#dform_widget_button_but_back_create_individual', function () {
        KDF.hidePage('create_individual_details');
        KDF.hidePage('create_individual_address');
    });

    $('#dform_' + form_name).off('click', '#dform_widget_button_but_back_customer_address').on('click', '#dform_widget_button_but_back_customer_address', function () {
        KDF.hidePage('provide_details_address');
    });

    $('#dform_' + form_name).off('click', '.copyaddressvalue').on('click', '.copyaddressvalue', function () {
        KDF.setVal('txt_p_uprn', KDF.getVal('txt_logic_uprn'));
        KDF.setVal('num_p_streetnumber', KDF.getVal('txt_logic_streetnumber'));
        KDF.setVal('txt_p_streetname', KDF.getVal('txt_logic_streetname'));
        KDF.setVal('txt_p_town', KDF.getVal('txt_logic_town'));
        KDF.setVal('txt_p_postcode', KDF.getVal('txt_logic_postcode'));
    });

    // Button "Continue" on Customer Information page click event.
    $('#dform_widget_button_but_customer_detail_continue').off('click').on('click', function () {
        console.log('KDF.getVal(txt_access)=' + KDF.getVal('txt_access'));
        console.log('custDetailsCheck= ' + custDetailsCheck());
		
        if (KDF.getVal('txt_access') === 'agent' && custDetailsCheck()) {
            KDF.customdata('update-individual-new', individualTemplateIdentifier + 'no-address-update', true, true, {
                'customerID': KDF.getVal('txt_customer_id'),
                'txt_first_name': KDF.getVal('txt_cust_info_first_name'),
                'txt_last_name': KDF.getVal('txt_cust_info_last_name'),
                'phone': KDF.getVal('tel_cust_info_phone'),
                'email': KDF.getVal('eml_cust_info_email')
            });
        }
        else {
            KDF.gotoNextPage();
        }
    });

    // Button "Continue" on Customer details - address page click event.
    $('#dform_widget_button_but_continue_customer_address').click(function () {
        if (KDF.getVal('txt_access') === 'agent' && custAddresssCheck() || custDetailsCheck()) {
            KDF.customdata('update-individual-new', individualTemplateIdentifier + 'create', true, true, {
                'customerID': KDF.getVal('txt_customer_id'),
                'txt_first_name': KDF.getVal('txt_cust_info_first_name'),
                'txt_last_name': KDF.getVal('txt_cust_info_last_name'),
                'phone': KDF.getVal('tel_cust_info_phone'),
                'email': KDF.getVal('eml_cust_info_email'),
                'num_p_streetnumber': KDF.getVal('num_p_streetnumber'),
                'txt_p_streetname': KDF.getVal('txt_p_streetname'),
                'txt_p_town': KDF.getVal('txt_p_town'),
                'txt_p_postcode': KDF.getVal('txt_p_postcode'),
                'txt_p_uprn': KDF.getVal('txt_p_uprn')
            });
        }
        else {
            KDF.gotoNextPage();
        }
    });



    addAccordion();
    $('#dform_widget_cs_customer_search_resultholder').on('show', function () {
        console.log('About to show but_individual_not_found widget on SHOW');
        $('#dform_widget_txta_cust_info_address').prop('readonly', true);

        KDF.showWidget('but_individual_not_found');
    });


    $('#dform_widget_cs_customer_search_resultholder').on('hide', function () {
        console.log('About to hide but_individual_not_found widget on HIDE');
        $('#dform_widget_txta_cust_info_address').prop('readonly', false);
        clearCustomerInformation();
        KDF.hideWidget('but_individual_not_found');
        KDF.hideWidget('but_cust_info_update_address');
    });

    $('#dform_widget_ps_create_individual_resultholder').on('show', function () {
        console.log('ps_create_individual_resultholder on show event');
        KDF.showWidget('txt_c_addressnumber');
        KDF.showWidget('txt_c_addressline1');
        KDF.showWidget('txt_c_town');
        KDF.showWidget('txt_c_postcode');
        //KDF.showWidget('but_continue_individual_address');
        KDF.showWidget('but_property_not_found');
    });

    $('#dform_widget_ps_create_individual_resultholder').on('hide', function () {
        console.log('ps_create_individual_resultholder on hide event');
        KDF.hideWidget('txt_c_addressnumber');
        KDF.hideWidget('txt_c_addressline1');
        KDF.hideWidget('txt_c_town');
        KDF.hideWidget('txt_c_postcode');
        //KDF.hideWidget('but_continue_individual_address');
        KDF.hideWidget('ahtm_edit_manual_createindividual');
        KDF.hideWidget('but_property_not_found');
        KDF.hideWidget('ahtm_cancel_edit_manual_createindividual');
    });



    /* create individual when button continue is clicked*/
    $('#dform_widget_button_but_continue_individual_address').click(function () {
        console.log('dform_widget_button_but_continue_individual_address clicked');

        KDF.customdata('create-individual-new', individualTemplateIdentifier + 'create', true, true, {
            'txt_c_forename': KDF.getVal('txt_c_forename'),
            'txt_c_surname': KDF.getVal('txt_c_surname'),
            'tel_c_telephone': KDF.getVal('tel_c_telephone'),
            'eml_c_email': KDF.getVal('eml_c_email'),
            'tel_c_mobile': KDF.getVal('tel_c_mobile'),
            'txt_c_addressnumber': KDF.getVal('txt_c_addressnumber'),
            'txt_c_addressline1': KDF.getVal('txt_c_addressline1'),
            'txt_c_town': KDF.getVal('txt_c_town'),
            'txt_c_postcode': KDF.getVal('txt_c_postcode'),
            'txt_c_uprn': KDF.getVal('txt_c_uprn')
        });
    });

    $('#dform_widget_ps_existing_customer_resultholder').on('show', function () {
        KDF.showWidget('but_property_notfound_customer');
    });

    $('#dform_widget_ps_existing_customer_resultholder').on('hide', function () {
        KDF.hideWidget('but_property_notfound_customer');
    });


    $('#dform_widget_button_but_property_notfound_customer').click(function () {
        $("#dform_widget_num_p_streetnumber").attr("readonly", false);
        $("#dform_widget_txt_p_streetname").attr("readonly", false);
        $("#dform_widget_txt_p_town").attr("readonly", false);
        $("#dform_widget_txt_p_postcode").attr("readonly", false);

        if (!KDF.getVal('txt_p_streetname')) {
            KDF.setVal('num_p_streetnumber', '');
            KDF.setVal('txt_p_streetname', '');
            KDF.setVal('txt_p_town', '');
            KDF.setVal('txt_p_postcode', '');
            KDF.hideWidget('ahtm_cancel_edit_manual_customerdetails');
        } else {
            KDF.showWidget('ahtm_cancel_edit_manual_customerdetails');
        }

        KDF.hideWidget('but_property_notfound_customer');

    });

    $('#cancel_edit_manually_customerdetails').click(function () {
        KDF.setVal('num_p_streetnumber', KDF.getVal('txt_temp_streetnumber_customerdetails'));
        KDF.setVal('txt_p_streetname', KDF.getVal('txt_temp_streetname_customerdetails'));
        KDF.setVal('txt_p_town', KDF.getVal('txt_temp_town_customerdetails'));
        KDF.setVal('txt_p_postcode', KDF.getVal('txt_temp_postcode_customerdetails'));

        $("#dform_widget_num_p_streetnumber").attr("readonly", true);
        $("#dform_widget_txt_p_streetname").attr("readonly", true);
        $("#dform_widget_txt_p_town").attr("readonly", true);
        $("#dform_widget_txt_p_postcode").attr("readonly", true);
        KDF.hideWidget('ahtm_cancel_edit_manual_customerdetails');
        KDF.showWidget('but_property_notfound_customer');

    });

    $('#dform_widget_button_but_property_not_found').click(function () {
        $("#dform_widget_txt_c_addressnumber").attr("readonly", false);
        $("#dform_widget_txt_c_addressline1").attr("readonly", false);
        $("#dform_widget_txt_c_town").attr("readonly", false);
        $("#dform_widget_txt_c_postcode").attr("readonly", false);

        if (!KDF.getVal('txt_c_addressline1')) {
            KDF.setVal('txt_c_addressnumber', '');
            KDF.setVal('txt_c_addressline1', '');
            KDF.setVal('txt_c_town', '');
            KDF.setVal('txt_c_postcode', '');
            KDF.hideWidget('ahtm_cancel_edit_manual_createindividual');
        } else {
            KDF.showWidget('ahtm_cancel_edit_manual_createindividual');
        }

        KDF.showWidget('txt_c_addressnumber');
        KDF.showWidget('txt_c_addressline1');
        KDF.showWidget('txt_c_town');
        KDF.showWidget('txt_c_postcode');
        KDF.showWidget('but_continue_individual_address');
        KDF.hideWidget('but_property_notfound');

    });

    $('#cancel_edit_manually_createindividual').click(function () {
        KDF.setVal('txt_c_addressnumber', KDF.getVal('txt_temp_streetnumber_createindividual'));
        KDF.setVal('txt_c_addressline1', KDF.getVal('txt_temp_streetname_createindividual'));
        KDF.setVal('txt_p_town', KDF.getVal('txt_temp_town_createindividual'));
        KDF.setVal('txt_c_postcode', KDF.getVal('txt_temp_postcode_createindividual'));

        $("#dform_widget_txt_c_addressnumber").attr("readonly", true);
        $("#dform_widget_txt_c_addressline1").attr("readonly", true);
        $("#dform_widget_txt_c_town").attr("readonly", true);
        $("#dform_widget_txt_c_postcode").attr("readonly", true);
        KDF.hideWidget('ahtm_cancel_edit_manual_createindividual');
        KDF.showWidget('but_property_notfound');

    });



}//end do_KDF_Ready_Individual


function do_KDF_Custom_Individual(event, kdf, response, action, actionedby) {
    //if (typeof response.actionedby == 'undefined' || response.actionedby == '') { response.actionedby = 'na'; }
    //console.log('actionedby= ' + response.actionedby);
	
	var isIndividualTemplate = false;
	
	if (response.actionedby.indexOf(individualTemplateIdentifier) === 0) {isIndividualTemplate = true;}
	console.log('is Individual template ? ', isIndividualTemplate);
	
	if (isIndividualTemplate) {		
		var actionedBySource = response.actionedby.replace(individualTemplateIdentifier, '');
		console.log('Actioned by source :', actionedBySource);
		
		if (action === 'person-retrieve-new' && actionedBySource === 'KDF_Ready') {
			console.log('person-retrieve-new show update address button');
			KDF.showWidget('but_cust_info_update_address');
			//Ensure the First Name and Last Name are read-only, aunthenticated citizen
			if (KDF.kdf().access === 'citizen') {
				$("#dform_widget_txt_cust_info_first_name").attr("readonly", true);
				$("#dform_widget_txt_cust_info_last_name").attr("readonly", true);
				$("#dform_widget_eml_cust_info_email").attr("readonly", true);
				$("#dform_widget_tel_cust_info_phone").attr("readonly", true);
				$("#dform_widget_txta_cust_info_address").attr("readonly", true);

			}
			
			KDF.showWidget('but_cust_info_update_address');
			KDF.showSection('area_customer_information');
			$('#dform_widget_txta_cust_info_address').prop('readonly', true);
		}
		else if (action === 'person-retrieve-new' && actionedBySource == 'update-individual') {
			console.log('custom action point 2');
			KDF.gotoNextPage();

		}
		else if (action === 'person-retrieve-new' && actionedBySource == 'create-individual') {
			console.log('custom action point 3');
			KDF.setCustomerID(KDF.getVal('txt_customer_id'), true, false); /*set Reporter*/
			KDF.gotoNextPage();

		}
		else if (action === 'update-individual-new') {
			console.log('custom action point 4');
			KDF.showSuccess('Individual Details Updated');
			KDF.customdata('person-retrieve-new', individualTemplateIdentifier + 'update-individual', true, true, { 'person_search_results': KDF.getVal('txt_customer_id') });
			KDF.showInfo('Individual Details Updated');

		}
		else if (action == 'create-individual-new') {
			console.log('custom action point 5');
			if (response.data.txt_customerID !== undefined) {
				console.log('custom action point 5a');
				KDF.showSuccess('Individual Details Created');
				KDF.showInfo('Individual Details Created');
				KDF.setVal('txt_customer_id', response.data.txt_customerID);
				//KDF.setCustomerID(response.data.txt_customerID, true, false); /*set Reporter*/
				KDF.customdata('person-retrieve-new', individualTemplateIdentifier + 'create-individual', true, true, { 'person_search_results': KDF.getVal('txt_customer_id') });
			}
		}
	}

	/* ORIGINAL
	if (action === 'person-retrieve-new') {
	    if (response.actionedby === 'kdf_ready') {
	        $('#dform_widget_txta_cust_info_address').prop('readonly', true);
	    }
	    else if (response.actionedby === 'update-individual' || response.actionedby === 'create-individual') {
	        KDF.gotoNextPage();
	    }
	}
	else if (action === 'update-individual-new') {
        KDF.customdata('person-retrieve-new', 'update-individual', true, true, {'person_search_results':KDF.getVal('txt_customer_id')});
    }
	else if (action == 'create-individual-new') {
        if (response.data.txt_customerID !== undefined) {
            KDF.setVal('txt_customer_id',response.data.txt_customerID);
            KDF.setCustomerID(response.data.txt_customerID,false,false); //set Reporter
            KDF.customdata('person-retrieve-new', 'create-individual', true, true, {'person_search_results':KDF.getVal('txt_customer_id')});
        }
	}
    */

}//end do_KDF_Custom_Individual()


function do_KDF_objectdataLoaded_Individual(event, kdf, response, type, id) {
    console.log('do_KDF_objectdataLoaded_Individual type: ' + type);
    console.log('do_KDF_objectdataLoaded_Individual id: ' + id);
    if (type === 'customer') {
        console.log('I am a customer ');
        KDF.setVal('txt_customer_id', id);
        KDF.showWidget('but_cust_info_update_address');
        KDF.showSection('area_customer_information');
    }
}//end do_KDF_objectdataLoaded_Individual


function do_KDF_fieldChange_Individual(event, kdf, field) {

    /*
    if (field.name == 'ps_createindividual_txt_streetname' || field.name == 'ps_createindividual_txt_postcode') {

        var streetName = KDF.getVal('ps_createindividual_txt_streetname').length;
        console.log('streetName =', streetName);
        var postCode = KDF.getVal('ps_createindividual_txt_postcode').length;
        console.log('postCode =', postCode);

        var totalLength = streetName + postCode;
        console.log('totalLength = ', totalLength);

        if (totalLength > 1) {
            console.log('allow to proceed');
            $('#dform_widget_ps_create_individual_searchbutton').prop('disabled', false);
        }

        if (totalLength < 2) {
            console.log('Not allowed to proceed');
            $('#dform_widget_ps_create_individual_searchbutton').prop('disabled', true);
            event.preventDefault();
            KDF.showInfo('Please complete the search fields before proceeding');
        }
     

    }//end (field.name == 'ps_createindividual_txt_streetname' ||  field.name == 'ps_createindividual_txt_postcode')
     */


    /*
    //Deals with the Customer details - address (Property Search Widget)
    if (field.name == 'ps_customerdetails_txt_streetname' || field.name == 'ps_customerdetails_txt_postcode') {

        var streetName = KDF.getVal('ps_customerdetails_txt_streetname').length;
        console.log('streetName =', streetName);
        var postCode = KDF.getVal('ps_customerdetails_txt_postcode').length;
        console.log('postCode =', postCode);

        var totalLength = streetName + postCode;
        console.log('totalLength = ', totalLength);

        if (totalLength > 1) {
            console.log('allow to proceed');
            $('#dform_widget_ps_existing_customer_searchbutton').prop('disabled', false);
        }

        if (totalLength < 2) {
            console.log('Not allowed to proceed');
            $('#dform_widget_ps_existing_customer_searchbutton').prop('disabled', true);
            event.preventDefault();
            KDF.showInfo('Please complete the search fields before proceeding');
        }

    }//end (field.name == 'ps_createindividual_txt_streetname' ||  field.name == 'ps_createindividual_txt_postcode')

   */



}//end do_KDF_fieldChange_Individual




// Check if the customer detail is change
function custDetailsCheck() {
    if (KDF.getVal('txt_cust_info_first_name') !== KDF.getVal('txt_logic_firstname') || KDF.getVal('txt_cust_info_last_name') !== KDF.getVal('txt_logic_lastname') ||
        KDF.getVal('eml_cust_info_email') !== KDF.getVal('txt_logic_email') || KDF.getVal('tel_cust_info_phone') !== KDF.getVal('txt_logic_phone')) {
        return true;
    } else {
        return false;
    }
}

// Check if the customer address is change
function custAddresssCheck() {
    if (KDF.getVal('num_p_streetnumber') !== KDF.getVal('txt_logic_streetnumber') || KDF.getVal('txt_p_streetname') !== KDF.getVal('txt_logic_streetname') ||
        KDF.getVal('txt_p_town') !== KDF.getVal('txt_logic_town') || KDF.getVal('txt_p_postcode') !== KDF.getVal('txt_logic_postcode')) {
        return true;
    } else {
        return false;
    }
}

/*jquery trigger based on display value*/
(function ($) {
    $.each(['show', 'hide'], function (i, ev) {
        var el = $.fn[ev];
        $.fn[ev] = function () {
            this.trigger(ev);
            return el.apply(this, arguments);
        };
    });
})(jQuery);

function clearCustomerInformation() {
    KDF.setVal('txt_cust_info_first_name', '');
    KDF.setVal('txt_cust_info_last_name', '');
    KDF.setVal('eml_cust_info_email', '');
    KDF.setVal('tel_cust_info_phone', '');
    KDF.setVal('txta_cust_info_address', '');
}


