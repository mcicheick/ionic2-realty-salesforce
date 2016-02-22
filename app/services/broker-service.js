import {Injectable} from 'angular2/core';
import * as force from './../force';

/*
 Prettify objects returned from Salesforce. This is optional, but it allows us to keep the templates independent
 from the Salesforce specific naming convention. This could also be done Salesforce-side by creating a custom REST service.
 */
let prettifyBroker = (broker) => {
    return {
        id: broker.Id,
        firstName: broker.First_Name__c,
        lastName: broker.Last_Name__c,
        title: broker.Title__c,
        picture: broker.Picture__c,
        phone: broker.Phone__c,
        mobilePhone: broker.Mobile_Phone__c,
        email: broker.Email__c
    };
};

@Injectable()
export class BrokerService {

    findAll() {
        return force.query(`SELECT id,
                                   first_name__c,
                                   last_name__c,
                                   title__c,
                                   picture__c
                            FROM broker__c
                            ORDER BY last_name__c, first_name__c
                            LIMIT 50`)
                .then(response => response.records.map(prettifyBroker));
    }

    findById(id) {
        return force.retrieve('Broker__c', id,
                                `Id,
                                First_Name__c,
                                Last_Name__c,
                                Title__c,
                                Picture__c,
                                Phone__c,
                                Mobile_Phone__c,
                                Email__c`)
            .then(prettifyBroker);
    }

}