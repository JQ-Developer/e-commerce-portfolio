//Styled and css, to write a block of css that can be used in any component
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

//Esto sirve por si le quiero añdir el mismo estilo a más de un elemtento, por ejemplo en este caso a un elemento div y a uno link
/*
const OptionContainerStyles = css`
  padding: 10px 15px;
  cursor: pointer;
`;
*/
export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

// If you need to put elements inside a styled component, en este caso en lugar de usar el Link de router lo estilizo con la función y lo renombro LogoContainer
export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

//También se pude poner el componente de la siguiente manera <componente as='div'  > y así no repetir nada de codigo
/*
export const OptionDiv = styled.div`
  ${OptionContainerStyles}
`;
*/
