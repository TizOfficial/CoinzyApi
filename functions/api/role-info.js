export async function onRequest(context) {
  const roleId = context.params.id;
  const token = context.env.DISCORD_TOKEN;

  const res = await fetch(`https://discord.com/api/v10/guilds/${guildId}/roles`, {
    headers: {
      Authorization: `Bot ${token}`
    }
  });

  const roles = await res.json();
  const role = roles.find(r => r.id === roleId);

  if (!role) {
    return new Response(JSON.stringify({ error: "Role not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify(role, null, 2), {
    headers: { "Content-Type": "application/json" }
  });
}
