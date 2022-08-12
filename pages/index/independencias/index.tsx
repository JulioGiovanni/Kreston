import { Card, Tabs } from '@mantine/core'
import Layout from '../../../components/Layout/Layout'




const index = () => {
  return (
    <Layout>
        <Card style={{height:400}} >
            <Tabs  variant="outline" >
                <Tabs.List grow position="center">

                  <Tabs.Tab value="Proyectos">
                      Proyectos
                  </Tabs.Tab>
                  <Tabs.Tab value="Anual">
                      Anual                      
                  </Tabs.Tab>
                </Tabs.List>
            </Tabs>
        </Card>
    </Layout>
  )
}

export default index