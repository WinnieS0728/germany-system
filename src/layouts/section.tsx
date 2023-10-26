interface propsType {
  children: JSX.Element;
  title?: string
}

export const Section = ({ children, title }: propsType) => {
    return (
        <section>
            {title && <h4 className="bg-sectionHeader text-myWhite p-2 text-lg">{title}</h4>}
            {children}
        </section>
    )
};
