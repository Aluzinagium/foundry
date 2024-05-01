import View from"./view.mjs";import sessions from"../../sessions.mjs";export default class LicenseView extends View{route="/license";_template="license";_methods=["get","post"];async handleGet(e,s){const t=global.config.license;if(!t.needsSignature)return s.redirect("/");const n=t.license?"eula":"key";return this.#e(e,s,n)}async handlePost(e,s){const{config:t}=global,n=t.license;if(!n.needsSignature)return s.redirect("/");let i=n.license?"eula":"key";if("key"===i)try{n.applyLicense(e.body.licenseKey),sessions.setMessage(e,s,"info","License key entered, please sign the End User License Agreement."),i="eula"}catch(t){sessions.setMessage(e,s,"error",t.message)}else{"decline"in e.body&&(n.applyLicense(null),t.app?t.app.quit():process.exit());const i=await n.sign();if("success"===i.status)return sessions.setMessage(e,s,"info",i.message),s.redirect(`${e.baseUrl}/setup`);if("error"===i.status)return sessions.setMessage(e,s,"error",i.message),n.applyLicense(null),s.redirect(`${e.baseUrl}/license`)}return this.#e(e,s,i)}#e(e,s,t){const n=View._getStaticContent({setup:!0});return s.render(this._template,{layout:"setup",bodyClass:"auth flexcol",scripts:n.scripts,styles:n.styles,isEULA:"eula"===t,licenseKey:e.body.licenseKey,messages:sessions.getMessages(e,{clear:!1}),step:t})}}