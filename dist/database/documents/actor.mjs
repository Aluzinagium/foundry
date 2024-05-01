import BaseActor from"../../../common/documents/actor.mjs";import ServerDocumentMixin from"../backend/server-document.mjs";import{setProperty}from"../../../common/utils/helpers.mjs";import{IMAGE_FILE_EXTENSIONS,VIDEO_FILE_EXTENSIONS}from"../../../common/constants.mjs";import Files from"../../files/files.mjs";import{HTMLField}from"../../../common/data/fields.mjs";export default class Actor extends(ServerDocumentMixin(BaseActor)){static socketListeners(e){e.on("requestTokenImages",this.#e.bind(this,e))}static async#e(e,t,{pack:s=null},o){const r=s?db.packs.get(s):db.Actor;if(!r.connected)return o({error:`The "${s}" database is not yet connected.`});const n=await r.get(t),i=n?.testUserPermission(e.user,"OWNER");if(!e.user.hasPermission("FILES_BROWSE")&&!i)return o({error:`You do not have permission to query wildcard token images for Actor [${t}].`});const c=n.prototypeToken;if(!c.randomImg)return o({files:[c.texture.src]});const{source:m,pattern:a,browseOptions:d}=Files.parseWildcardPath(c.texture.src);d.isAdmin=!0,d.target=a,d.extensions=Object.keys(IMAGE_FILE_EXTENSIONS).concat(Object.keys(VIDEO_FILE_EXTENSIONS)).map((e=>`.${e}`));config.files.storages[m].getFiles(d).then(o).catch((e=>o({error:e.message})))}}