export default async function handler(req,res){
 if(req.method!=="POST")return res.status(405).json({error:"Method not allowed"});
 const key=process.env.RESEND_API_KEY;
 const to=process.env.INQUIRY_TO_EMAIL;
 const from=process.env.INQUIRY_FROM_EMAIL||"Costa's Karate <onboarding@resend.dev>";
 if(!key||!to)return res.status(503).json({error:"Email recipient and provider must be configured before desktop inquiries can be delivered."});
 const message=typeof req.body?.message==="string"?req.body.message.trim():"";
 if(!message||message.length>6000)return res.status(400).json({error:"Invalid inquiry"});
 try{
  const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Authorization":"Bearer "+key,"Content-Type":"application/json"},body:JSON.stringify({from,to:[to],subject:"New Costa's Tang Soo Do class inquiry",text:message})});
  if(!response.ok)throw new Error("Email provider rejected the request");
  return res.status(200).json({ok:true});
 }catch(error){return res.status(502).json({error:"Unable to deliver inquiry right now. Please call the studio."})}
}
