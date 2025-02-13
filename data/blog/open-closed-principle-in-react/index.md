---
title: Принцип открытости-закрытости в React
created: 2025-02-13
modified: 2025-02-13
seo_description: Рассмотрим Open-Closed Principle применимо к React
seo_tags:
  - React
  - JavaScript
tags:
  - React
  - JavaScript
---

## Введение

После изучения принципов **инверсии зависимостей (Dependency Inversion)**, **разделения интерфейсов (Interface Segregation)** и **подстановки Барбары Лисков (Liskov Substitution)** давайте рассмотрим принцип открытости-закрытости (Open-Closed Principle) в контексте современных приложений React.

И снова, респект дяде Бобу за то, что он напомнил мне о важности **хорошей архитектуры программного обеспечения** в своей классической книге «Чистая архитектура»! Эта книга — мое главное вдохновение для этой серии.

> Принцип открытости-закрытости (Open-Closed Principle) гласит, что программные сущности должны быть открыты для расширения, но закрыты для модификации.

В терминах React: компоненты должны легко расширяться без изменения существующего кода. Давайте посмотрим, как это будет выглядеть на практике.

## Проблема с закрытыми компонентами

Вот распространенный антишаблон:

```tsx
// АНТИПАТТЕРН: НЕ ДЕЛАЙ ТАК!
const Button = ({ label, onClick, variant }: ButtonProps) => {
  let className = 'button';

  // Прямая модификация для каждого варианта
  if (variant === 'primary') {
    className += ' button-primary';
  } else if (variant === 'secondary') {
    className += ' button-secondary';
  } else if (variant === 'danger') {
    className += ' button-danger';
  }

  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};
```

Это нарушает принцип открытости-закрытости, потому что:

1. Добавление нового варианта требует изменения компонента;
2. Компонент должен знать обо всех возможных вариантах;
3. Тестирование становится сложнее с каждым добавлением.

## Создание открытых (расширяемых) компонентов

Давайте исправим это в соответствии с принципом открытости-закрытости:

```tsx
type ButtonBaseProps = {
  label: string;
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
};

const ButtonBase = ({ label, onClick, className = '', children }: ButtonBaseProps) => (
  <button className={`button ${className}`.trim()} onClick={onClick}>
    {children || label}
  </button>
);

// Варианты компонентов расширяют базовый компонент
const PrimaryButton = (props: ButtonBaseProps) => <ButtonBase {...props} className="button-primary" />;

const SecondaryButton = (props: ButtonBaseProps) => <ButtonBase {...props} className="button-secondary" />;

const DangerButton = (props: ButtonBaseProps) => <ButtonBase {...props} className="button-danger" />;
```

Теперь мы можем легко добавлять новые варианты, не изменяя существующий код:

```tsx
// Добавление нового варианта без изменения исходных компонентов
const OutlineButton = (props: ButtonBaseProps) => <ButtonBase {...props} className="button-outline" />;
```

## Паттерн композиция компонентов

Давайте рассмотрим более сложный пример с использованием композиции:

```tsx
type CardProps = {
  title: string;
  children: React.ReactNode;
  renderHeader?: (title: string) => React.ReactNode;
  renderFooter?: () => React.ReactNode;
  className?: string;
};

const Card = ({ title, children, renderHeader, renderFooter, className = '' }: CardProps) => (
  <div className={`card ${className}`.trim()}>
    {renderHeader ? renderHeader(title) : <div className="card-header">{title}</div>}

    <div className="card-content">{children}</div>

    {renderFooter && renderFooter()}
  </div>
);

// Расширяет функционал компонента без его модификации
const ProductCard = ({ product, onAddToCart, ...props }: ProductCardProps) => (
  <Card {...props} renderFooter={() => <button onClick={onAddToCart}>Add to Cart - ${product.price}</button>} />
);
```

## Использование компонентов высшего порядка (HOC)

HOC предоставляют еще один способ следовать принципу открытости-закрытости:

```tsx
type WithLoadingProps = {
  isLoading?: boolean;
};

const withLoading = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return ({ isLoading, ...props }: P & WithLoadingProps) => {
    if (isLoading) {
      return <div className="loader">Loading...</div>;
    }

    return <WrappedComponent {...(props as P)} />;
  };
};

// Использование
const UserProfileWithLoading = withLoading(UserProfile);
```

## Использование пользовательских хуков

Пользовательские хуки также могут следовать принципу открытости-закрытости:

```tsx
const useDataFetching = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [url]);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, refetch: fetchData };
};

// Расширено без изменений
const useUserData = (userId: string) => {
  const result = useDataFetching<User>(`/api/users/${userId}`);

  // Добавить функциональные возможности, специфичные для пользователя
  const updateUser = async (data: Partial<User>) => {
    // Логика обновления
  };

  return { ...result, updateUser };
};
```

## Преимущества тестирования

Следование принципу открытости-закрытости значительно упрощает тестирование:

```tsx
describe('ButtonBase', () => {
  it('renders with custom className', () => {
    render(<ButtonBase label="Test" onClick={() => {}} className="custom" />);

    expect(screen.getByRole('button')).toHaveClass('button custom');
  });
});

// Новые варианты могут иметь свои собственные тесты.
describe('PrimaryButton', () => {
  it('includes primary styling', () => {
    render(<PrimaryButton label="Test" onClick={() => {}} />);

    expect(screen.getByRole('button')).toHaveClass('button button-primary');
  });
});
```

## Ключевые выводы

1. **Используйте композицию вместо модификации** — расширяйте ее с помощью props и render props;
2. **Создавайте базовые компоненты**, которые легко расширять;
3. **Используйте HOC и пользовательские хуки** для расширения функциональности;
4. **Думайте в терминах точек расширения** - что может потребоваться изменить?
5. **Используйте TypeScript**, чтобы сделать расширения типобезопасными.

## Принцип открытости-закрытости и «композиция вместо наследования»

Рекомендация команды React о [«композиции вместо наследования»](https://react.dev/learn/thinking-in-react) идеально соответствует принципу открытости-закрытости. Вот почему:

```tsx
// Подход, основанный на наследовании (менее гибкий)
class Button extends BaseButton {
  render() {
    return (
      <button className={this.getButtonClass()}>
        {this.props.icon && <Icon name={this.props.icon} />}
        {this.props.label}
      </button>
    );
  }
}

// Подход, основанный на композиции (более гибкий, соответствует принципу открытости-закрытости)
const Button = ({ label, icon, renderPrefix, renderSuffix, ...props }: ButtonProps) => (
  <ButtonBase {...props}>
    {renderPrefix?.()}
    {icon && <Icon name={icon} />}
    {label}
    {renderSuffix?.()}
  </ButtonBase>
);

// Теперь мы можем расширить поведение без внесения изменений.
const DropdownButton = ({ items, ...props }: DropdownButtonProps) => (
  <Button {...props} renderSuffix={() => <DropdownIcon />} onClick={() => setIsOpen(true)} />
);

const LoadingButton = ({ isLoading, ...props }: LoadingButtonProps) => (
  <Button {...props} renderPrefix={() => isLoading && <Spinner />} disabled={isLoading} />
);
```

Этот подход, основанный на композиции:

1. Делает компоненты открытыми для расширения (через props и render props);
2. Сохраняет базовые компоненты закрытыми для модификации;
3. Позволяет использовать неограниченное количество комбинаций поведения;
4. Поддерживает безопасность типов и прозрачность свойств.

Предпочтение команды React в отношении композиции касается не только стиля — речь идет о создании расширяемых, поддерживаемых компонентов, которые естественным образом следуют принципу открытости-закрытости.

## Заключение

Принцип открытости-закрытости может показаться абстрактным, но в React он преобразуется в практические шаблоны, которые делают наши компоненты более удобными для обслуживания и гибкими. В сочетании с нашими предыдущими принципами SOLID он помогает создать надежную архитектуру, которую легко расширять и обслуживать.

Оставайтесь с нами, чтобы увидеть нашу последнюю публикацию в этой серии, в которой мы рассмотрим принцип единственной ответственности (Single Responsibility Principle)!

> Совет: если вы обнаружили, что используете много операторов if/else для разных вариантов или поведений, вы, вероятно, нарушаете принцип открытости-закрытости. Рассмотрите возможность использования композиции вместо этого.

> Этот пост использует материалы статьи [https://cekrem.github.io/posts/open-closed-principle-in-react/](https://cekrem.github.io/posts/open-closed-principle-in-react/)
