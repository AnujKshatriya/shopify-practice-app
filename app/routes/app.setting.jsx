import {
  Box,
  Card,
  Button,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  TextField,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import { json } from "@remix-run/react";
import {Form, useLoaderData} from "@remix-run/react"

export async function loader() {
  //database query
  return { name: "Anuj Kshatriya", description: "Welcome Home!" };
}

export async function action({ request }) {
  const data = await request.formData();
  return json({ name: data.get("name"), description: data.get("description") });
}

export default function SettingPage() {
  const setting =  useLoaderData();
  const [formData, setFormData] = useState(setting);
  return (
    <Page>
      <TitleBar title="Setting page" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Send Data
              </Text>
              <Text as="p" variant="bodyMd">
                Please enter the data you would like to send to the server.
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="POST">
              <BlockStack gap="400">
                <TextField label="Name" value={formData.name} onChange={(e) => setFormData({...formData,name:e})}/>
                <TextField label="Description" value={formData.description} onChange={(e) => setFormData({...formData,description:e})}/>
                <Button submit={true}>Send</Button>
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
        
      </BlockStack>
    </Page>
  );
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
