import { getServers } from "@/data/projects/get-servers";
import React from "react"

type PageByIdProps = {
  params: {
    projectId: string,
    serverName: string,
  }
}

export default async function InstancePage(params: PageByIdProps){

  const data = params.params;
  // const serverName = data.projectId;
  const servers = await getServers(data.projectId);
  console.log(servers);
  

  return (
    <div>
      <h1 className="text-lg"><b>{servers.name}</b></h1>
      <h1 className="text-lg"><b>{servers.id}</b></h1>
    </div>
  )
};
