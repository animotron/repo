/*
 *  Copyright (C) 2011-2012 The Animo Project
 *  http://animotron.org
 *
 *  This file is part of Animotron.
 *
 *  Animotron is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of
 *  the License, or (at your option) any later version.
 *
 *  Animotron is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of
 *  the GNU Affero General Public License along with Animotron.
 *  If not, see <http://www.gnu.org/licenses/>.
 */
package org.animotron.expression;

import org.animotron.exception.AnimoException;
import org.animotron.graph.builder.FastGraphBuilder;
import org.animotron.statement.Statement;
import org.animotron.statement.Statements;
import org.animotron.statement.instruction.Instruction;
import org.animotron.statement.operator.AN;
import org.animotron.statement.operator.REF;
import org.animotron.statement.operator.DEF;

import javax.xml.stream.XMLStreamReader;
import java.io.IOException;
import java.util.Stack;

/**
 * @author <a href="mailto:gazdovsky@gmail.com">Evgeny Gazdovsky</a>
 *
 */
public class XMLAnimoExpression extends StAXExpression {

    private Stack<Boolean> s = new Stack<Boolean>();

    public XMLAnimoExpression(XMLStreamReader reader) {
        super(new FastGraphBuilder(), reader);
    }

    @Override
    public void build() throws Throwable {
        super.process();
    }

    @Override
    protected void startElement() throws AnimoException, IOException {
        String prefix = reader.getPrefix();
        String name = reader.getLocalName();
        if ("ptrn".equals(prefix) && "language".equals(name)) {
            s.push(false);
        } else if ("have".equals(prefix) || "is".equals(prefix) || "ic".equals(prefix)) {
            builder.start(AN._);
                builder._(REF._, name.equals("name") ? "word" : name);
            s.push(true);
        } else {
            Statement s = Statements.relationshipType(prefix);
            if (s != null) {
                if (s instanceof DEF) {
                    builder.start(DEF._, name);
                } else if (s instanceof Instruction) {
                    builder.start(AN._);
                        builder._(REF._, prefix);
                        builder.start(AN._);
                            builder._(REF._, name);
                        builder.end();
                } else {
                    builder.start(s);
                        builder._(REF._, name);
                }
            } else {
                super.startElement();
            }
            this.s.push(true);
        }
    }

    @Override
    protected void endElement() throws AnimoException, IOException {
        if (s.pop()) {
            super.endElement();
        }
    }

}
