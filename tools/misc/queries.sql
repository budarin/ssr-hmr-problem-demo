
SET ROLE customer;

/*select * from public.web_supplier_root('{
    "id": "1",
	"ver": "1.0.0",
    "method": "register_company",
    "params": {
    	"code": "0000000001",
        "title": "Рога и Ко",
        "address": "Донецк, улица Артема 100 офис 56",
        "contact_person": "Наталья Степановна",
		"email": "email@roga_and_co.com",
        "phone_code": "+38050",
		"phone": "678-90-00",
        "login_name_prefix": "roga"
    }
}');*/


fetch('http://localhost:5000', {
  	method: 'POST',
    headers: {
        'Content-Type': 'application/json',
		'request-id': '1',
        'api-version': '1.0.0'
    },
    body: JSON.stringify({
        method: 'appruve_company',
        params: {
            company_id: '05908ef8-8121-4b9b-b009-ce141499b8f5',
        },
    })
})

/*select * from public.web_supplier_api_root('{
	"ver": "1.0.0",
    "method": "register_supplier",
    "params": {
    	"login_name": "www@sidorov",
		"email": "www@www.com",
        "phone_code": "+38050",
		"phone": "678-90-00",
		"company_code": "0000000001",
		"fio": "Сидоров Сидор Сидорович",
        "password": "дуся"
    },
    "id": "1"
}')*/

/*select * from public.web_supplier_api_root('{
	"ver": "1.0.0",
    "method": "login_through_link",
    "params": {
    	"token": "05908ef8-8121-4b9b-b009-ce141499b8f5"
	},
    "id": "1"
}')*/

/*select * from public.web_supplier_api_root('{
	"ver": "1.0.0",
    "method": "send_me_auth_link",
    "params": {
    	"login_name": "www@sidorov"
	},
    "id": "1"
}')*/


/*select * from public.web_supplier_api_root('{
	"ver": "1.0.0",
    "method": "login",
    "params": {
    	"login_name": "www@sidorov",
        "password": "дуся"
	},
    "meta": {
        "headers": {
            "user-agent": "User-Agent 123"
        },
        "cookies" : {
            "did": "a5524d87-56fc-4a55-ad9c-73767a5e01d3"
        }
    },
    "id": "1"
}');*/


/*select * from public.util_process_device_id('{
	"params": {"uid" : "f7b764e3-b690-4728-b64e-fa65e09b7220", "device_id" : "a5524d87-56fc-4a55-ad9c-73767a5e01d3", "user_agent" : "User-Agent 123"}
}');*/


--generate random sms code
/*select floor(1000 + random() * 8999);*/


RESET ROLE;