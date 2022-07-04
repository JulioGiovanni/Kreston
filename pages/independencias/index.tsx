import { Card, Tabs } from '@mantine/core'
import Layout from '../../components/Layout/Layout'




const index = () => {
  return (
    <Layout>
        <Card style={{height:400}} >
            <Tabs grow position="center" variant="outline" tabPadding="xl">
                <Tabs.Tab label="Proyectos">
                    
                </Tabs.Tab>
                <Tabs.Tab label="Anual">
                    
                </Tabs.Tab>
            </Tabs>
        </Card>
    </Layout>
  )
}

export default index