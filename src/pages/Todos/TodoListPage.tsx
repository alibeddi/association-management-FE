import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useLocales } from '../../locales';
import { TodoList } from '../../sections/@dashboard/todos';

export default function MyTodoListPage() {
  const { translate } = useLocales();

  return (
    <>
      <Helmet>
        <title>{`${translate('My Todo List')}`}</title>
      </Helmet>

      <Container maxWidth={false}>
        <CustomBreadcrumbs heading="Todo List" links={[{ name: 'My tasks' }]} />
        <TodoList />
      </Container>
    </>
  );
}
