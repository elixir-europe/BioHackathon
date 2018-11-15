/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
* @file   This files defines the org.bforos contract
* @author Augusto Gomez, Camilo Ruiz, Carlos Castro, Alexander Garcia
* @since  24.09.2018
*/

'use strict';

/**
* Create a research object after it is created
* Recieve a reward on succesefully create Ro's
* @fires org.bforos.walletEvent
* @param {org.bforos.CreateResearchOJ} createROData
* @transaction
*/
async function createResearchOJ(createROData) {
    // define reward for claiming objetc
    const points = 1;
    // get wallet balance from creator
    const balance = createROData.creator.wallet;
    // new balance
    createROData.creator.wallet = balance + points;
    // check if researcher already claims the research object
    const factory = getFactory();
    const researchObj = factory.newResource('org.bforos', 'ResearchOJ', createROData.researchObjId);
    researchObj.typeRO = createROData.typeRO;
    researchObj.uri = createROData.uri;
    researchObj.contributors = [];
    researchObj.collectors = [];
    researchObj.contributors.push(createROData.creator);
    // 1. update asset registry
    let assetRegistry = await getAssetRegistry('org.bforos.ResearchOJ');
    await assetRegistry.add(researchObj);
    // 2. update researcher registry
    let participantRegistry = await getParticipantRegistry('org.bforos.Researcher');
    await participantRegistry.update(createROData.creator);
    // Emit an event for the modified participant wallet.
    let event = getFactory().newEvent('org.bforos', 'WalletEvent');
    event.claimer = createROData.creator;
    event.operation = "CREATE";
    event.oldBalance = balance;
    event.newBalance = balance + points;
    emit(event);
}

/**
* Create a disco after it is created
* Reciebe a reward on succesefully create disco
* @fires org.bforos.walletEvent
* @param {org.bforos.CreateDisco} createData
* @transaction
*/
async function createDisco(createDiscoData) {
    // check if researcher have al research objects
    const researchObjs = collectDiscoData.disco.researchObjs;
    let points = 0;
    for(let i = 0; i < researchObjs.length; i++){
        const roCollectors = researchObjs[i].collectors;
        let exist = false;
        for(let cl = 0; cl < roCollectors.length; cl++){
            if(roCollectors[cl].researcherId == collectDiscoData.collector.researcherId){
                exists = true;
                break;
            }
        }
        if(exist)
            continue;
        const contributors = researchObjs[i].contributors;
        for(let ct = 0; ct < contributors.length; ct++){
            if(contributors[cl].researcherId == collectDiscoData.collector.researcherId){
                exists = true;
                break;
            }
        }
        if(!exits)
            throw new Error("Researcher dont have research object " + researchObjs[i.researchObjId]);
    }

    const balance = createDiscoData.creator.wallet;
    // new balance
    createDiscoData.creator.wallet = balance + points;
    // check if researcher already claims the research object
    const factory = getFactory();
    const disco = factory.newResource('org.bforos', 'Disco', createDiscoData.discoId);
    disco.title = createDiscoData.title;
    disco.researchObjs = researchObjs;
    disco.owner = createDiscoData.creator;
    disco.collectors = [];
    // 1. update asset registry
    let assetRegistry = await getAssetRegistry('org.bforos.Disco');
    await assetRegistry.add(disco);
    // 2. update researcher registry
    let participantRegistry = await getParticipantRegistry('org.bforos.Researcher');
    await participantRegistry.update(createDiscoData.creator);
    // Emit an event for the modified participant wallet.
}

/**
* Claim a Research object after it is created
* all contributors recieve a reward on succesefully claimed Ro's
* @fires WalletEvent
* @param {org.bforos.ClaimRO} claimData
* @transaction
*/
async function claimRO(claimData) {
    // define reward for claiming objetc
    const points = claimData.researchObj.reward;
    // get wallet balance from claimant
    const balance = claimData.claimer.wallet;
    // get contributors of Research Object
    const contributors = claimData.researchObj.contributors;
    // new balance
    claimData.claimer.wallet = balance + points;
    // check if researcher already claims the research object
    let exists = false;
    for(let i = 0; i < contributors.length; i++){
        if(contributors[i].researcherId == claimData.claimer.researcherId){
            exists = true;
            break;
        }
    }
    // if researcher researcher is a collector remove of collectors
    if(exists)
        throw new Error('Researcher already claims the research object');
    else
        claimData.researchObj.contributors.push(claimData.claimer);

    const collectors = claimData.researchObj.collectors;
    exists = false;
    for(let i = 0; i < collectors.length; i++){
        if(collectors[i].researcherId == claimData.claimer.researcherId){
            claimData.researchObj.collectors.splice(i, 1);
            break;
        }
    }

    // 1. update asset registry
    let assetRegistry = await getAssetRegistry('org.bforos.ResearchOJ');
    await assetRegistry.update(claimData.researchObj);
    // 2. update researcher registry
    let participantRegistry = await getParticipantRegistry('org.bforos.Researcher');
    await participantRegistry.update(claimData.claimer);
    // Emit an event for the modified participant wallet.
    let event = getFactory().newEvent('org.bforos', 'WalletEvent');
    event.claimer = claimData.claimer;
    event.operation = "CLAIM";
    event.oldBalance = balance;
    event.newBalance = balance + points;
    emit(event);
}

/**
* Collect Research object for use in own research
* pay the cost of collectin Ro's
* @fires WalletEvent
* @param {org.bforos.CollectRO} collectData
* @transaction
*/
async function collectRO(collectData) {
    // define cost for collecting objetc
    const points = collectData.researchObj.cost;
    // define a reward
    const reward = collectData.researchObj.reward;
    // get wallet balance from collector
    const balance = collectData.collector.wallet;
    if (balance-points < 0) {
        throw new Error('Wallet amount insuficient for transaction');
    } else {
        // new balance
        collectData.collector.wallet = balance - points;
    }
    const collectors = collectData.researchObj.collectors;
    let exists = false;
    for(let i = 0; i < collectors.length; i++){
        if(collectors[i].researcherId == collectData.collector.researcherId){
            exists = true;
            break;
        }
    }
    // if researcher already claims the research object throw exception
    // else push researcher to contributors
    if(exists)
        throw new Error('Researcher already collects the research object');
    else
        collectData.researchObj.collectors.push(collectData.collector);

    let contributors = collectData.researchObj.contributors;
    exists = false;
    for(let i = 0; i < contributors.length; i++){
        if(contributors[i].researcherId == collectData.collector.researcherId){
            exists = true;
            break;
        }
    }
    // if researcher already claims the research object throw exception
    // else push researcher to contributors
    if(exists)
        throw new Error('Researcher already have the research object');
    
    // 1. update asset registry
    let assetRegistry = await getAssetRegistry('org.bforos.ResearchOJ');
    await assetRegistry.update(collectData.researchObj);

    let participantRegistry = await getParticipantRegistry('org.bforos.Researcher');

    for(var i = 0; i < contributors.length; i++){
        // update registry of i contributor
        const balance = contributors[i].wallet;
      	contributors[i].wallet = balance + reward;
        await participantRegistry.update(contributors[i]);
        // Emit an event for the modified participant wallet.
        let event = getFactory().newEvent('org.bforos', 'WalletEvent');
        event.claimer = contributors[i];
        event.operation = "COLLECT";
        event.oldBalance = balance;
        event.newBalance = balance + reward;
        emit(event);
    }

    await participantRegistry.update(collectData.collector);
    // Emit an event for the modified participant wallet.
    const event = getFactory().newEvent('org.bforos', 'WalletEvent');
    event.claimer = collectData.collector;
    event.operation = "COLLECT";
    event.oldBalance = balance;
    event.newBalance = balance-points;
    emit(event);
}

/**
* Collect Research object for use in own research
* pay the cost of collectin Ro's
* @fires WalletEvent
* @param {org.bforos.CollectDisco} collectDiscoData
* @transaction
*/
async function collectDisco(collectDiscoData) {

    // if researcher already claims the disco throw exception
    // else push researcher to contributors
    const collectors = collectDiscoData.disco.collectors;
    let exists = false;
    for(let i = 0; i < collectors.length; i++){
        if(collectors[i].researcherId == collectData.collector.researcherId){
            exists = true;
            break;
        }
    }

    if(exists)
        throw new Error('Researcher already collects the disco');
    else
        collectDiscoData.disco.collectors.push(collectDiscoData.collector);

    // if researcher is owner of the disco throw exception
    if(collectDiscoData.collector.researcherId == collectDiscoData.disco.owner.researcherId)
        throw new Error('Researcher already have the disco');

    // calculate cost of disco (count cost of research objects that researcher don't have)
    const researchObjs = collectDiscoData.disco.researchObjs;
    let points = 0;
    for(let i = 0; i < researchObjs.length; i++){
        const roCollectors = researchObjs[i].collectors;
        let exist = false;
        for(let cl = 0; cl < roCollectors.length; cl++){
            if(roCollectors[cl].researcherId == collectDiscoData.collector.researcherId){
                exists = true;
                break;
            }
        }
        if(exist)
            continue;
        const contributors = researchObjs[i].contributors;
        for(let ct = 0; ct < contributors.length; ct++){
            if(contributors[cl].researcherId == collectDiscoData.collector.researcherId){
                exists = true;
                break;
            }
        }
        if(!exits)
            points += researcherId[i].cost;
    }

    // get wallet balance from collector
    const balance = collectDiscoData.collector.wallet;
    if (balance-points < 0) {
        throw new Error('Wallet amount insuficient for transaction');
    } else {
        // new balance
        collectDiscoData.collector.wallet = balance - points;
    }

    // 1. update asset registry
    let assetRegistry = await getAssetRegistry('org.bforos.Disco');
    await assetRegistry.update(collectDiscoData.disco);
    let participantRegistry = await getParticipantRegistry('org.bforos.Researcher');

    await participantRegistry.update(collectDiscoData.collector);
    // Emit an event for the modified participant wallet.
    const event = getFactory().newEvent('org.bforos', 'WalletEvent');
    event.claimer = collectDiscoData.collector;
    event.operation = "COLLECT";
    event.oldBalance = balance;
    event.newBalance = balance-points;
    emit(event);

    // reward to all contributors of researcher object
    for(let i = 0; i < researchObjs.length; i++){
        let contributors = researchObjs[i].contributors;
        const reward = researchObjs[i].reward;
        for(let ct = 0; ct < contributors.length; ct++){
            // dont get reward if disco collector i s contributor of research object
            if(collectDiscoData.collector.researcherId == contributors[ct].researcherId)
                continue;
            const balance = contributors[ct].wallet;
            contributors[i].wallet = balance + reward;
            await participantRegistry.update(contributors[i]);
            // Emit an event for the modified participant wallet.
            let event = getFactory().newEvent('org.bforos', 'WalletEvent');
            event.claimer = contributors[i];
            event.operation = "COLLECT";
            event.oldBalance = balance;
            event.newBalance = balance + reward;
            emit(event);
        }
    }
}

/**
* Count when a software is running
* Recieve a reward on succesefully running
* @fires CountEvent
* @param {org.bforos.CountRO} countData
* @transaction
*/
async function CountRO(countData) {
    // define reward for enriching objetc
    const points = countData.researchObj.reward;
    // get count access to research object
    const countAccess = countData.researchObj.countAccess;
    // get research object contributors
    let contributors = countData.researchObj.contributors;
    // increment the number of access to research object
    countData.researchObj.countAccess += 1;
    // 1. update asset registry
    let assetRegistry = await getAssetRegistry('org.bforos.ResearchOJ');
    await assetRegistry.update(countData.researchObj);    
    // 2. update registry of all contributors
    for(var i = 0; i < contributors.length; i++){
        // update registry of i contributor
        let participantRegistry =  await getParticipantRegistry('org.bforos.Researcher');
        const balance = contributors[i].wallet;
      	contributors[i].wallet = balance + points
        await participantRegistry.update(contributors[i]);
        // Emit an event for the modified participant wallet.
        let event = getFactory().newEvent('org.bforos', 'WalletEvent');
        event.claimer = contributors[i];
        event.operation = "ACCESS";
        event.oldBalance = balance;
        event.newBalance = balance + points;
        emit(event);
    }
    // Emit event for count access modified
    let countEvent = getFactory().newEvent('org.bforos', 'CountEvent');
    countEvent.researchObj = countData.researchObj;
    countEvent.description = countData.description;
    countEvent.oldCountAccess = countAccess;
    countEvent.newCountAccess = countAccess + 1;
    emit(countEvent);    
}

/**
* Enrich a Research object after it is created
* Recieve a reward on succesefully Enriched Ro's
* @param {org.bforos.Enrich} enrichData
* @transaction
*/
async function enrichRO(enrichData) {
    // define reward for enriching objetc
    const points = enrichData.researchObj.reward;
    // get wallet balance for contributor
    const balance = enrichData.contributor.wallet;
    // new balance
    enrichData.contributor.wallet = balance + points;
    // assigned contributor of enriched objetc
    enrichData.researchObj.contributor.push(enrichData.contributor);
    // 1. update asset registry
    let assetRegistry = await getAssetRegistry('org.bforos.ResearchOJ');
    await assetRegistry.update(enrichData.researchObj);    
    // 2. update participant registry
    let participantRegistry =  await getParticipantRegistry('org.bforos.Researcher');
    await participantRegistry.update(enrichData.contributor);

    // Emit an event for the modified participant wallet.
    const event = getFactory().newEvent('org.bforos', 'WalletEvent');
    event.claimer = enrichData.contributor;
    event.operation = "ENRICH";
    event.oldBalance = balance;
    event.newBalance = balance+points;
    emit(event);
}

/**
* Get the history of a research object
* @fires ResearchOJHistoryResults
* @param {org.bforos.ResearchOJHistory} transaction
* @transaction
*/
async function getResearchOJHistory(transaction){
    const ROId = transaction.researchObjId
    const nativeSupport = transaction.nativeSupport;

    const assetRegistry = await getAssetRegistry('org.bforos.ResearchOJ');

    const nativeKey = getNativeAPI().createCompositeKey('Asset:org.bforos.ResearchOJ', [researchObjId]);
    const iterator = await getNativeAPI().getHistoryForKey(nativeKey);
    let results = [];
    let res = { done: false };
    while (!res.done) {
        res = await iterator.next();

        if (res && res.value && res.value.value) {
            const value = res.value.value.toString('utf8');
            const record = {
                tx_id: res.value.tx_id,
                value: value,
                timestamp: res.value.timestamp
            };          
            results.push(JSON.stringify(record));
        }
        if (res && res.done) {
            try {
                iterator.close();
            } catch (err) {
            }
        }
    }

    const event = getFactory().newEvent('org.bforos', 'ResearchOJHistoryResults');
    event.results = results;
    emit(event);

}


/**
* Get the history of a disco
* @fires ResearchOJHistoryResults
* @param {org.bforos.DiscoHistory} transaction
* @transaction
*/
async function getResearchDiscoHistory(transaction){
    const discoId = transaction.discoId
    const nativeSupport = transaction.nativeSupport;

    const assetRegistry = await getAssetRegistry('org.bforos.Disco');

    const nativeKey = getNativeAPI().createCompositeKey('Asset:org.bforos.Disco', [discoId]);
    const iterator = await getNativeAPI().getHistoryForKey(nativeKey);
    let results = [];
    let res = { done: false };
    while (!res.done) {
        res = await iterator.next();

        if (res && res.value && res.value.value) {
            const value = res.value.value.toString('utf8');
            const record = {
                tx_id: res.value.tx_id,
                value: value,
                timestamp: res.value.timestamp
            };          
            results.push(JSON.stringify(record));
        }
        if (res && res.done) {
            try {
                iterator.close();
            } catch (err) {
            }
        }
    }

    const event = getFactory().newEvent('org.bforos', 'ResearchDiscoHistoryResults');
    event.results = results;
    emit(event);

}

/**
* History of an administrator
* @param {org.bforos.ResearcherHistory} transaction
* @transaction
*/
async function getResearcherHistory(transaction) {
    const researcherId = transaction.researcherId;
    const nativeSupport = transaction.nativeSupport;
  
    const participantRegistry = await getParticipantRegistry('org.bforos.Researcher');
  
    const nativeKey = getNativeAPI().createCompositeKey('Participant:org.bforos.Researcher', [researcherId]);
    const iterator = await getNativeAPI().getHistoryForKey(nativeKey);
    let results = [];
    let res = { done: false };
    while (!res.done) {
        res = await iterator.next();
  
        if (res && res.value && res.value.value) {
            const value = res.value.value.toString('utf8');
            const record = {
                tx_id: res.value.tx_id,
                value: value,
                timestamp: res.value.timestamp
            };          
            results.push(JSON.stringify(record));
        }
        if (res && res.done) {
            try {
                iterator.close();
            } catch (err) {
            }
        }
    }
  
    const event = getFactory().newEvent('org.bforos', 'ResearcherHistoryResults');
    event.results = results;
    emit(event);
  
    // return results;
}
  
