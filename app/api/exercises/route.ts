import supabase from "@/app/lib/supabase";

export async function GET() {
  const { data, error } = await supabase.from("exercises").select("*");

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, kg, sets, reps, misc } = body;

  const { data, error } = await supabase
    .from("exercises")
    .insert([{ name, kg, sets, reps, misc }])
    .select()
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, name, kg, sets, reps, misc } = body;

  if (!id) {
    return new Response(JSON.stringify({ error: "ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data, error } = await supabase
    .from("exercises")
    .update({ name, kg, sets, reps, misc })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { exercises } = body;

  if (!Array.isArray(exercises)) {
    return new Response(
      JSON.stringify({ error: "Invalid payload: exercises array required" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const updates = await Promise.all(
    exercises.map(({ id, order }) =>
      supabase.from("exercises").update({ order }).eq("id", id),
    ),
  );

  const failed = updates.find(({ error }) => error);
  if (failed) {
    return new Response(
      JSON.stringify({
        error: failed.error?.message || "Failed to update order",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  return new Response(
    JSON.stringify({ message: "Order updated successfully" }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { id } = body;

  if (!id) {
    return new Response(JSON.stringify({ error: "ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { error } = await supabase.from("exercises").delete().eq("id", id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({ message: "Exercise deleted successfully" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}
