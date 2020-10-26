//The purpose of this file is to isolate the specific JS functions required to handle the organization pages and function in the Verint organization template.

var organizationTemplateIdentifier = 'organization_template_';

function do_KDF_Ready_Organization(event, kdf) {
    console.log('do_KDF_Ready_Organization');
	
    if (KDF.getVal('txt_organization_id') !== '' && KDF.getVal('rad_viewmode') !== 'R' && KDF.getVal('rad_viewmode') !== 'U') {
        KDF.customdata('organization-retrieve-new', organizationTemplateIdentifier + 'KDF_Ready', true, true, { 'org_search_results': KDF.getVal('txt_organization_id') });
    }
    else if (KDF.kdf().access === 'citizen') {
    	KDF.showSection('area_organization_information');

	    KDF.showWidget('ps_organization_property_search');
// 		KDF.showWidget('txt_org_info_street_number');
// 		KDF.showWidget('txt_org_info_street_name');
// 		KDF.showWidget('txt_org_info_town');
// 		KDF.showWidget('txt_org_info_postcode');
		KDF.hideWidget('txta_org_info_address');
    }
    else if (KDF.getVal('rad_viewmode') === 'R' || KDF.getVal('rad_viewmode') === 'U') {
	    KDF.showSection('area_organization_information');
    }

    var form_name = kdf.name;

    $('#dform_' + form_name).off('click', '#dform_widget_button_but_back_create_organization').on('click', '#dform_widget_button_but_back_create_organization', function () {
        KDF.hidePage('create_organization_details');
        KDF.hidePage('create_organization_address');
    });

    $('#dform_' + form_name).off('click', '#dform_widget_button_but_back_organization_address').on('click', '#dform_widget_button_but_back_organization_address', function () {
        KDF.hidePage('provide_details_address_org');
    });

    $('#dform_' + form_name).off('click', '.copyaddressorgvalue').on('click', '.copyaddressorgvalue', function () {
        KDF.setVal('txt_org_uprn', KDF.getVal('txt_logic_org_uprn'));
        KDF.setVal('num_org_streetnumber', KDF.getVal('txt_logic_org_streetnumber'));
        KDF.setVal('txt_org_streetname', KDF.getVal('txt_logic_org_streetname'));
	KDF.setVal('txt_org_unit', KDF.getVal('txt_logic_org_unit'));
        KDF.setVal('txt_org_town', KDF.getVal('txt_logic_org_town'));
        KDF.setVal('txt_org_postcode', KDF.getVal('txt_logic_org_postcode'));
    });

    // Button "Continue" on Your Details page click event.
    $('#dform_widget_button_but_organization_detail_continue').off('click').on('click', function () {
        console.log('KDF.getVal(txt_access)=' + KDF.getVal('txt_access'));
        console.log('orgDetailsCheck= ' + orgDetailsCheck());
	    KDF.setVal('eml_subscriber', KDF.getVal('eml_org_info_email'));
	    
        if (KDF.getVal('txt_access') === 'agent' && orgDetailsCheck()) {
	    if (KDF.check('.dform_section_area_organization_information') === 0) {
	            KDF.customdata('update-organization-new', organizationTemplateIdentifier + 'no-address-update', true, true, {
	                'organizationID': KDF.getVal('txt_organization_id'),
	                'txt_org_name': KDF.getVal('txt_org_info_name'),
	                'phone': KDF.getVal('tel_org_info_phone'),
	                'email': KDF.getVal('eml_org_info_email')
	            });
	    }
        }
        else if (KDF.getVal('txt_access') === 'citizen') {	
			if (KDF.check('.dform_section_area_organization_information') === 0) {
				KDF.hideWidget('ahtm_search_address_warning');
	            var address = KDF.getVal('txt_org_info_street_number') + ', ' + KDF.getVal('txt_org_info_street_name') +' '+ KDF.getVal('txt_org_info_unit') + ', ' + KDF.getVal('txt_org_info_town') + ', ' + KDF.getVal('txt_org_info_postcode');
				KDF.setVal('txta_org_info_address', address);

				if (($('input[name=txt_org_info_street_number]').prop('required') && KDF.getVal('txt_org_info_street_number') == '') || 
				($('input[name=txt_org_info_street_name]').prop('required') && KDF.getVal('txt_org_info_street_name') == '') || 
				($('input[name=txt_org_info_unit]').prop('required') && KDF.getVal('txt_org_info_unit') == '') || 
				($('input[name=txt_org_info_town]').prop('required') && KDF.getVal('txt_org_info_town') == '') || 
				($('input[name=txt_org_info_postcode]').prop('required') && KDF.getVal('txt_org_info_postcode') == '')) {
				    KDF.showWidget('ahtm_search_address_warning');
				}
			    else {
					KDF.gotoNextPage();
				}	
			}
        }
        else {
            KDF.gotoNextPage();
        }
    });

    // Button "Continue" on Customer details - address page click event.
    $('#dform_widget_button_but_continue_organization_address').click(function () {
        if (KDF.getVal('txt_access') === 'agent' && orgAddresssCheck() || orgDetailsCheck()) {
if (KDF.check('.dform_section_area_organization_details_address') === 0) {
            KDF.customdata('update-organization-new', organizationTemplateIdentifier + 'create', true, true, {
                'organizationID': KDF.getVal('txt_organization_id'),
                'txt_org_name': KDF.getVal('txt_org_info_name'),
                'phone': KDF.getVal('tel_org_info_phone'),
                'email': KDF.getVal('eml_org_info_email'),
                'num_org_streetnumber': KDF.getVal('num_org_streetnumber'),
                'txt_org_streetname': KDF.getVal('txt_org_streetname'),
                'txt_org_unit': KDF.getVal('txt_org_unit'),
                'txt_org_town': KDF.getVal('txt_org_town'),
                'txt_org_postcode': KDF.getVal('txt_org_postcode'),
                'txt_org_uprn': KDF.getVal('txt_org_uprn')
            });
        }
        else {
            KDF.gotoNextPage();
        }
    });



    addAccordion();
    $('#dform_widget_os_organization_search_resultholder').on('show', function () {
        console.log('About to show but_organization_not_found widget on SHOW');
        $('#dform_widget_txta_org_info_address').prop('readonly', true);

        KDF.showWidget('but_organization_not_found');
    });


    $('#dform_widget_os_organization_search_resultholder').on('hide', function () {
        console.log('About to hide but_organization_not_found widget on HIDE');
        $('#dform_widget_txta_org_info_address').prop('readonly', false);
        clearOrganizationInformation();
        KDF.hideWidget('but_organization_not_found');
        KDF.hideWidget('but_org_info_update_address');
KDF.hideSection('area_organization_information');
    });

    $('#dform_widget_ps_create_organization_resultholder').on('show', function () {
        console.log('ps_create_organization_resultholder on show event');
        KDF.showWidget('txt_c_org_addressnumber');
        KDF.showWidget('txt_c_org_addressline1');
	KDF.showWidget('txt_c_org_unit');
        KDF.showWidget('txt_c_org_town');
        KDF.showWidget('txt_c_org_postcode');
        //KDF.showWidget('but_continue_create_organization_address');
        KDF.showWidget('but_property_not_found_org');
    });

    $('#dform_widget_ps_create_organization_resultholder').on('hide', function () {
        console.log('ps_create_organization_resultholder on hide event');
        KDF.hideWidget('txt_c_org_addressnumber');
        KDF.hideWidget('txt_c_org_addressline1');
	KDF.hideWidget('txt_c_org_unit');
        KDF.hideWidget('txt_c_org_town');
        KDF.hideWidget('txt_c_org_postcode');
        //KDF.hideWidget('but_continue_create_organization_address');
        KDF.hideWidget('ahtm_edit_manual_createorganization');
        KDF.hideWidget('but_property_not_found_org');
        KDF.hideWidget('ahtm_cancel_edit_manual_createorganization');
    });



    /* create organization when button continue is clicked*/
    $('#dform_widget_button_but_continue_create_organization_address').click(function () {
        console.log('dform_widget_button_but_continue_create_organization_address clicked');

if (KDF.check('dform_section_area_create_organization_address') === 0) {
        KDF.customdata('create-organization-new', organizationTemplateIdentifier + 'create', true, true, {
            'txt_c_name': KDF.getVal('txt_c_org_name'),
            'tel_c_telephone': KDF.getVal('tel_c_org_telephone'),
            'eml_c_email': KDF.getVal('eml_c_org_email'),
            'tel_c_mobile': KDF.getVal('tel_c_mobile'),
            'txt_c_addressnumber': KDF.getVal('txt_c_org_addressnumber'),
            'txt_c_addressline1': KDF.getVal('txt_c_org_addressline1'),
	    'txt_c_unit': KDF.getVal('txt_c_org_unit'),
            'txt_c_town': KDF.getVal('txt_c_org_town'),
            'txt_c_postcode': KDF.getVal('txt_c_org_postcode'),
            'txt_c_uprn': KDF.getVal('txt_c_org_uprn')
        });
}
    });

    $('#dform_widget_ps_existing_organization_resultholder').on('show', function () {
        KDF.showWidget('but_property_notfound_organization');
    });

    $('#dform_widget_ps_existing_organization_resultholder').on('hide', function () {
        KDF.hideWidget('but_property_notfound_organization');
    });

$('#dform_widget_ps_organization_property_search_resultholder').on('show', function () {
        KDF.hideWidget('ahtm_search_address_warning');
        KDF.hideWidget('but_property_notfound_organization');
		KDF.showWidget('txt_org_info_street_number');
		KDF.showWidget('txt_org_info_street_name');
		KDF.showWidget('txt_org_info_unit');
		KDF.showWidget('txt_org_info_town');
		KDF.showWidget('txt_org_info_postcode');
    });

    $('#dform_widget_ps_organization_property_search_resultholder').on('hide', function () {
        KDF.hideWidget('but_property_notfound_organization');
    });

    $('#dform_widget_button_but_property_notfound_organization').click(function () {
        $("#dform_widget_num_org_streetnumber").attr("readonly", false);
        $("#dform_widget_txt_org_streetname").attr("readonly", false);
	$("#dform_widget_txt_org_unit").attr("readonly", false);
        $("#dform_widget_txt_org_town").attr("readonly", false);
        $("#dform_widget_txt_org_postcode").attr("readonly", false);

        if (!KDF.getVal('txt_org_streetname')) {
            KDF.setVal('num_org_streetnumber', '');
            KDF.setVal('txt_org_streetname', '');
	    KDF.setVal('dform_widget_txt_org_unit', '');
            KDF.setVal('txt_org_town', '');
            KDF.setVal('txt_org_postcode', '');
            KDF.hideWidget('ahtm_cancel_edit_manual_orgnizationdetails');
        } else {
            KDF.showWidget('ahtm_cancel_edit_manual_organizationdetails');
        }

        KDF.hideWidget('but_property_notfound_organization');

    });

    $('#cancel_edit_manually_organizationdetails').click(function () {
        KDF.setVal('num_org_streetnumber', KDF.getVal('txt_temp_streetnumber_organizationdetails'));
        KDF.setVal('txt_org_streetname', KDF.getVal('txt_temp_streetname_organizationdetails'));
	KDF.setVal('txt_org_unit', KDF.getVal('txt_temp_unit_organizationdetails'));
        KDF.setVal('txt_org_town', KDF.getVal('txt_temp_town_organizationdetails'));
        KDF.setVal('txt_org_postcode', KDF.getVal('txt_temp_postcode_organizationdetails'));

        $("#dform_widget_num_org_streetnumber").attr("readonly", true);
        $("#dform_widget_txt_org_streetname").attr("readonly", true);
	$("#dform_widget_txt_org_unit").attr("readonly", true);
        $("#dform_widget_txt_org_town").attr("readonly", true);
        $("#dform_widget_txt_org_postcode").attr("readonly", true);
        KDF.hideWidget('ahtm_cancel_edit_manual_organizationdetails');
        KDF.showWidget('but_property_notfound_organization');

    });

    $('#dform_widget_button_but_property_not_found_org').click(function () {
        $("#dform_widget_txt_c_org_addressnumber").attr("readonly", false);
        $("#dform_widget_txt_c_org_addressline1").attr("readonly", false);
	$("#dform_widget_txt_c_org_unit").attr("readonly", false);
        $("#dform_widget_txt_c_org_town").attr("readonly", false);
        $("#dform_widget_txt_c_org_postcode").attr("readonly", false);

        if (!KDF.getVal('txt_c_org_addressline1')) {
            KDF.setVal('txt_c_org_addressnumber', '');
            KDF.setVal('txt_c_org_addressline1', '');
	    KDF.setVal('txt_c_org_unit', '');
            KDF.setVal('txt_c_org_town', '');
            KDF.setVal('txt_c_org_postcode', '');
            KDF.hideWidget('ahtm_cancel_edit_manual_createorganization');
        } else {
            KDF.showWidget('ahtm_cancel_edit_manual_createorganization');
        }

        KDF.showWidget('txt_c_org_addressnumber');
        KDF.showWidget('txt_c_org_addressline1');
	KDF.showWidget('txt_c_org_unit');
        KDF.showWidget('txt_c_org_town');
        KDF.showWidget('txt_c_org_postcode');
        KDF.showWidget('but_continue_organization_address');
        KDF.hideWidget('but_property_notfound');

    });

    $('#cancel_edit_manually_createorganization').click(function () {
        KDF.setVal('txt_c_org_addressnumber', KDF.getVal('txt_temp_streetnumber_createorganization'));
        KDF.setVal('txt_c_org_addressline1', KDF.getVal('txt_temp_streetname_createorganization'));
	KDF.setVal('txt_c_org_unit', KDF.getVal('txt_temp_unit'));
        KDF.setVal('txt_c_org_town', KDF.getVal('txt_temp_town_createorganization'));
        KDF.setVal('txt_c_org_postcode', KDF.getVal('txt_temp_postcode_createorganization'));

        $("#dform_widget_txt_c_org_addressnumber").attr("readonly", true);
        $("#dform_widget_txt_c_org_addressline1").attr("readonly", true);
	$("#dform_widget_txt_c_org_unit").attr("readonly", true);
        $("#dform_widget_txt_c_org_town").attr("readonly", true);
        $("#dform_widget_txt_c_org_postcode").attr("readonly", true);
        KDF.hideWidget('ahtm_cancel_edit_manual_createorganization');
        KDF.showWidget('but_property_notfound');

    });



}//end do_KDF_Ready_Organization


function do_KDF_Custom_Organization(event, kdf, response, action) {
    //if (typeof response.actionedby == 'undefined' || response.actionedby == '') { response.actionedby = 'na'; }
    //console.log('actionedby= ' + response.actionedby);
	
	var isOrganizationTemplate = false;
	
	if (response.actionedby.indexOf(organizationTemplateIdentifier) === 0) {isOrganizationTemplate = true;}
	console.log('is Organization template ? ', isOrganizationTemplate);
	
	if (isOrganizationTemplate) {		
		var actionedBySource = response.actionedby.replace(organizationTemplateIdentifier, '');
		console.log('Actioned by source :', actionedBySource);
		
		if (action === 'organization-retrieve-new' && actionedBySource === 'KDF_Ready') {
			console.log('organization-retrieve-new show update address button');
			KDF.showWidget('but_org_info_update_address');
			//Ensure the First Name and Last Name are read-only, aunthenticated citizen
			if (KDF.kdf().access === 'citizen') {
				$("#dform_widget_txt_org_info_name").attr("readonly", true);
				$("#dform_widget_eml_org_info_email").attr("readonly", true);
				$("#dform_widget_tel_org_info_phone").attr("readonly", true);
				$("#dform_widget_txta_org_info_address").attr("readonly", true);
				$("#dform_widget_txt_org_info_street_number").attr("readonly", false);
			
				$("#dform_widget_txt_org_info_street_name").attr("readonly", false);
					$("#dform_widget_txt_org_info_unit").attr("readonly", false);
				$("#dform_widget_txt_org_info_town").attr("readonly", false);
				$("#dform_widget_txt_org_info_postcode").attr("readonly", false);

				KDF.setVal('txt_org_info_street_number', KDF.getVal('txt_logic_org_streetnumber'));
				KDF.setVal('txt_org_info_street_name', KDF.getVal('txt_logic_org_streetname'));
				KDF.setVal('txt_org_info_unit', KDF.getVal('txt_logic_org_unit'));
				KDF.setVal('txt_org_info_town', KDF.getVal('txt_logic_org_town'));
				KDF.setVal('txt_org_info_postcode', KDF.getVal('txt_logic_org_postcode'));
				KDF.showWidget('ps_organization_property_search');
				// Collapse the property search widget.
				$('.accordion_label[data-for="dform_widget_ps_organization_property_search_id"]').click();

				KDF.showWidget('txt_org_info_street_number');
				KDF.showWidget('txt_org_info_street_name');
				KDF.showWidget('txt_org_info_unit');
				KDF.showWidget('txt_org_info_town');
				KDF.showWidget('txt_org_info_postcode');
				KDF.hideWidget('txta_org_info_address');

			}
			
			KDF.showWidget('but_org_info_update_address');
			KDF.showSection('area_organization_information');
			$('#dform_widget_txta_org_info_address').prop('readonly', true);
		}
		else if (action === 'organization-retrieve-new' && actionedBySource == 'update-organization') {
			console.log('custom action point 2');
			KDF.gotoNextPage();

		}
		else if (action === 'organization-retrieve-new' && actionedBySource == 'create-organization') {
			console.log('custom action point 3');
			KDF.setOrganisationID(KDF.getVal('txt_organization_id'), true, false); /*set Reporter*/
			KDF.gotoNextPage();

		}
		else if (action === 'update-organization-new') {
			console.log('custom action point 4');
			KDF.showSuccess('Organization Details Updated');
			KDF.showInfo('Organization Details Updated');
			KDF.customdata('organization-retrieve-new', organizationTemplateIdentifier + 'update-organization', true, true, { 'org_search_results': KDF.getVal('txt_organization_id') });
		}
		else if (action == 'create-organization-new') {
			console.log('custom action point 5');
			if (response.data.txt_organizationID !== undefined) {
				console.log('custom action point 5a');
				KDF.showSuccess('Organization Details Created');
				KDF.showInfo('Organization Details Created');
				KDF.setVal('txt_organization_id', response.data.txt_organizationID);
				KDF.customdata('organization-retrieve-new', organizationTemplateIdentifier + 'create-organization', true, true, { 'org_search_results': KDF.getVal('txt_organization_id') });
			}
		}
	}
}//end do_KDF_Custom_Organization()


function do_KDF_objectdataLoaded_Organization(event, kdf, response, type, id) {
    console.log('do_KDF_objectdataLoaded_Organization type: ' + type);
    console.log('do_KDF_objectdataLoaded_Organization id: ' + id);
    console.log('do_KDF_objectdataLoaded_Organization response: ', response);
    
    if (type === 'organisation') {
        console.log('I am a organisation ');
        KDF.setVal('txt_organization_id', id);
        KDF.showWidget('but_org_info_update_address');
        KDF.showSection('area_organization_information');
    }
}//end do_KDF_objectdataLoaded_Organization

// Check if the organization detail is change
function orgDetailsCheck() {
    if (KDF.getVal('txt_org_info_name') !== KDF.getVal('txt_logic_org_name') ||
        KDF.getVal('eml_org_info_email') !== KDF.getVal('txt_logic_org_email') || KDF.getVal('tel_org_info_phone') !== KDF.getVal('txt_logic_org_phone')) {
        return true;
    } else {
        return false;
    }
}

// Check if the organization address is change
function orgAddresssCheck() {
    if (KDF.getVal('num_org_streetnumber') !== KDF.getVal('txt_logic_org_streetnumber') || KDF.getVal('txt_org_streetname') !== KDF.getVal('txt_logic_org_streetname') || KDF.getVal('txt_org_unit') !== KDF.getVal('txt_logic_org_unit')  ||
        KDF.getVal('txt_org_town') !== KDF.getVal('txt_logic_org_town') || KDF.getVal('txt_org_postcode') !== KDF.getVal('txt_logic_org_postcode')) {
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

function clearOrganizationInformation() {
    KDF.setVal('txt_org_info_name', '');
    KDF.setVal('eml_org_info_email', '');
    KDF.setVal('tel_org_info_phone', '');
    KDF.setVal('txta_org_info_address', '');
}

