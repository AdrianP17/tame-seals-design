import { Form, Input, Modal, Select } from "antd"
import CompanyListPage from "./list"
import { useModalForm, useSelect } from "@refinedev/antd"
import { useGo } from "@refinedev/core"
import { CREATE_COMPANY_MUTATION } from "@/graphql/mutations"
import { USERS_SELECT_QUERY } from "@/graphql/queries"
import SelectOptionWithAvatar from "@/components/select-option-avatar"
import { GetFields, GetFieldsFromList } from "@refinedev/nestjs-query"
import { UsersSelectQuery } from "@/graphql/types"


const Create = () => {
    const go = useGo()

    const goToListPage = () => {
        go({
            to: {resource: 'companies', action: 'list'},
            options: { keepQuery: true },
            type: 'replace'
        })
    }
    const { formProps, modalProps} = useModalForm({
        action: 'create',
        defaultVisible: true,
        resource: 'companies',
        redirect: false,
        mutationMode: 'pessimistic',
        onMutationSuccess: goToListPage,
        meta: {
            gqlMutation: CREATE_COMPANY_MUTATION
        }
    })
    const {selectProps, query} = useSelect<GetFieldsFromList<UsersSelectQuery>>({
        resource: 'users',
        optionLabel: 'name',
        meta: {
            gqlQuery: USERS_SELECT_QUERY
        }
    })

  return (
    <CompanyListPage>
        <Modal {...modalProps} 
        mask={ true}
        onCancel={goToListPage}
        title="Create Company"
        width={512}
        >
        <Form {...formProps} layout="vertical" >
            <Form.Item 
                label="Name"
                name="name"
                rules={[{required: true}]}
            >
                <Input placeholder="Please enter company name" />
            </Form.Item>
            <Form.Item 
                label="Sales owner"
                name="salesOwnerId"
                rules={[{required: true}]}
            >
                <Select placeholder="Please select a sales owner"
                {...selectProps}
                options={query.data?.data.map(user => ({
                    value: user.id,
                    label: (
                        <SelectOptionWithAvatar 
                        name={user.name}
                        avatarUrl={user.avatarUrl ?? undefined}
                        />
                    )
                })) ?? [] } 
                />
            </Form.Item>
        </Form>
        </Modal>
    </CompanyListPage>
  )
}
export default Create