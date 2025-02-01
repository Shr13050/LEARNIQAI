// "use client"
// import React from 'react'
// import FormSection from '../_components/FormSection'
// import OutputSection from '../_components/OutputSection'
// import { TEMPLATE } from '../../_components/TemplateListSection'
// import Templates from '@/app/(data)/Templates'

// interface PROPS{
//     params:{
//  'template-slug':string
//     }
   
// }

// const CreateNewContent
//  = (props:PROPS) => {

//   const selectedTemplate:TEMPLATE|undefined=Templates?.find((item)=>item.slug==props.params['template-slug'])
    
//   return (
//     <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
//         {/* forms section */}
//         <FormSection selectedTemplate={selectedTemplate} 
//         userFormInput/>
       


//         {/* output section  */}
//         <OutputSection/>

//     </div>
//   )
// }

// export default CreateNewContent

// "use client";

// import React, { useState } from "react";
// import FormSection from "../_components/FormSection";
// import OutputSection from "../_components/OutputSection";
// import { TEMPLATE } from "../../_components/TemplateListSection";
// import Templates from "@/app/(data)/Templates";
// import { useParams } from "next/navigation";
// import { ArrowLeft } from "lucide-react";
// import Link from "next/link";
// import { chatSession } from "@/utils/AiModel";
// import { db } from "@/utils/db";
// import { AIOutput } from "@/utils/schema";
// import { useUser } from "@clerk/nextjs";
// import moment from "moment";


// const CreateNewContent = () => {
//   const params = useParams(); // Unwrap the params promise
//   const templateSlug = params["template-slug"]; // Access the template-slug

//   const selectedTemplate: TEMPLATE | undefined = Templates?.find(
//     (item) => item.slug === templateSlug
//   );

//   const [loading,setLoading]=useState(false);
  
// const[aiOutput,setAIOutput]=useState<string>('')

// const {user}=useUser();

//   const GenerateAicontent=async(FormData:any)=>{
//     setLoading(true);
//     //logic 
//     const SelectedPrompt=selectedTemplate?.aiprompt;

//     const FinalAiprompt=JSON.stringify(FormData)+","+SelectedPrompt

//     const result=await chatSession.sendMessage(FinalAiprompt);
//     setAIOutput(result?.response.text());
//     await saveInDb(FormData,selectedTemplate?.slug,result?.response.text())
//     setLoading(false);  

//   }

//   const saveInDb=async(FormData:any,slug:any,aiResponse:string)=>{
//     const result=await db.insert(AIOutput).values({
//       FormData:FormData,
//       templateSlug:slug,
//       aiResponse:aiOutput,
//       createdBy:user?.primaryEmailAddress?.emailAddress||"anonymous",
//       createdAt:moment().format('DD/MM/yyyy'),

//     })
//   }

//   return (
//     <div>
//   <Link href={"/dashboard"}>
//     <button><ArrowLeft/></button>
//   </Link>

//   <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
//     {/* Forms section */}
//     <div className="col-span-1 md:col-span-1">
//       <FormSection 
//         selectedTemplate={selectedTemplate} 
//         userFormInput={(v: any) => GenerateAicontent(v)} 
//      loading={loading} />
//     </div>

//     {/* Output section */}
//     <div className="col-span-1 md:col-span-2">
//       <OutputSection aiOutput={aiOutput}/>
//     </div>
//   </div>
// </div>

  
//   );
// };

// export default CreateNewContent;

// db.ts - Database setup

// CreateNewContent.tsx
"use client";

import React, { useState } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AiModel";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const CreateNewContent = () => {
  const params = useParams();
  const templateSlug = params["template-slug"];

  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === templateSlug
  );

  const [loading, setLoading] = useState(false);
  const [aiOutput, setAIOutput] = useState<string>("");

  const { user } = useUser();

  const GenerateAicontent = async (formData: any) => {
    setLoading(true);

    const SelectedPrompt = selectedTemplate?.aiprompt;
    const FinalAiprompt = JSON.stringify(formData) + "," + SelectedPrompt;

    try {
      const result = await chatSession.sendMessage(FinalAiprompt);
      const aiResponse = result?.response?.text();

      if (aiResponse) {
        setAIOutput(aiResponse);
        await saveInDb(formData, selectedTemplate?.slug, aiResponse);
      } else {
        console.error("AI response is undefined");
      }
    } catch (error) {
      console.error("Error generating AI content:", error);
    }

    setLoading(false);
  };

  const saveInDb = async (formData: any, slug: string | undefined, aiResponse: string) => {
    console.log("Saving to DB:", { formData, slug, aiResponse });

    try {
      const result = await db.insert(AIOutput).values({
        formData: JSON.stringify(formData),
        templateSlug: slug || "unknown",
        aiResponse: aiResponse,
        createdBy: user?.primaryEmailAddress?.emailAddress || "anonymous",
        createdAt: moment().toISOString(),
      });
      console.log("Insert successful:", result);
    } catch (error) {
      console.error("Error inserting into DB:", error);
    }
  };

  return (
    <div>
      <Link href={"/dashboard"}>
        <button>
          <ArrowLeft />
        </button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        {/* Forms section */}
        <div className="col-span-1 md:col-span-1">
          <FormSection
            selectedTemplate={selectedTemplate}
            userFormInput={(v: any) => GenerateAicontent(v)}
            loading={loading}
          />
        </div>

        {/* Output section */}
        <div className="col-span-1 md:grid-cols-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
};

export default CreateNewContent;
