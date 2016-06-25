(set-option :fixedpoint.engine datalog)

(define-sort var () (_ BitVec 16))
(define-sort obj () (_ BitVec 16))
(define-sort prop () (_ BitVec 16))
(define-sort num () (_ BitVec 16))
(define-sort lineNum () (_ BitVec 16))
(define-sort evType () (_ BitVec 16))

;;;;;;; definitions ;;;;;;;
; Assign (variable variable line#)
; a = b
(declare-rel Assign (var var lineNum))
; Load (variable property variable line#)
; a.b = c
(declare-rel Load (var prop var lineNum))
; Store (variable variable property line#)
; a = b.c;
(declare-rel Store (var var prop lineNum))

; Read1 (variable line#)
(declare-rel Read1 (var lineNum))
; Read2 (variable property line#)
(declare-rel Read2 (var prop lineNum))
; Write1 (variable line#)
(declare-rel Write1 (var lineNum))
; Write2 (variable property line#)
(declare-rel Write2 (var prop lineNum))

; PtsTo (variable object)
(declare-rel PtsTo (var obj))
; HeapPtsTo (variable property object)
(declare-rel HeapPtsTo (var prop obj))

; Stmt (line# object)
(declare-rel Stmt (lineNum obj))
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; Formal (object number variable)
(declare-rel Formal (obj num var))
; Actual (line# number var)
(declare-rel Actual (lineNum num var))
; MethodRet (object variable)
(declare-rel MethodRet(obj var))
; CallRet (line# variable)
(declare-rel CallRet (lineNum var))
; Calls (object line#)
(declare-rel Calls (obj lineNum))
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; FuncDecl (variable object line#)
(declare-rel FuncDecl (var obj lineNum))
; Heap (variable object)
(declare-rel Heap (var obj))
; Dom (variable object)
(declare-rel Dom (var obj))
; DomRead (variable line#)
(declare-rel DomRead (var lineNum))
; DomWrite (variable line#)
(declare-rel DomWrite (var lineNum))
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; data-dep (line# line#)
(declare-rel data-dep (lineNum lineNum))
; con-dep (line# line#)
(declare-rel control-dep (lineNum lineNum))
; stmt-dep (line# line#)
(declare-rel stmt-dep (lineNum lineNum))
; call-dep (variable variable)
(declare-rel call-dep (var var))
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; dom-install (variable eventType variable line#)
(declare-rel dom-install (var evType var lineNum))
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; dom-data-dep (object eventType object eventType)
(declare-rel dom-data-dep (obj evType obj evType))
; dom-install-dep (object eventType object eventType)
(declare-rel dom-install-dep (obj evType obj evType))
; dom-dep (object eventType object eventType)
(declare-rel dom-dep (obj evType obj evType))


;;;;;;; rules ;;;;;;;
(declare-var o1 obj)
(declare-var o2 obj)
(declare-var o3 obj)
(declare-var o4 obj)
(declare-var v1 var)
(declare-var event1 evType)
(declare-var v2 var)
(declare-var event2 evType)
(declare-var line1 lineNum)
(declare-var v3 var)
(declare-var v4 var)
(declare-var v5 var)
(declare-var v6 var)
(declare-var f1 prop)
(declare-var i1 num)
(declare-var line2 lineNum)
(declare-var line3 lineNum)
(declare-var line4 lineNum)

;;; pointsTo rule ;;;
(rule (=> (Heap v1 o1) (PtsTo v1 o1))) 
(rule (=> (FuncDecl v1 o1 line1) (PtsTo v1 o1)))
(rule (=> (Dom v1 o1) (PtsTo v1 o1)))
(rule (=> (DomRead v1 line1) (PtsTo v1 o1)))
(rule (=> (and
            (PtsTo v1 o1)
            (Assign v2 v1 line1))
           (PtsTo v2 o1)))

;;; Stmt rule ;;;
(rule (=> (and
            (Stmt line1 o2)
            (call-dep o1 o2))
           (Stmt line1 o1)))

;;; call graph ;;;
(rule (=> (and
            (Actual line1 #x0000 v1)
            (PtsTo v1 o1))
           (Calls o1 line1)))

;;; Heap rules ;;;
(rule (=> (and
            (Store v1 f1 v2 line1)
            (PtsTo v1 o1)
            (PtsTo v2 o2))
           (HeapPtsTo o1 f1 o2)))
(rule (=> (and
            (Load v2 v1 f1 line1)
            (PtsTo v1 o1)
            (HeapPtsTo o1 f1 o2))
           (PtsTo v2 o2)))

;;; Interprocedural rules ;;;
(rule (=> (and 
            (Calls o1 line1)
            (Formal o1 i1 v1)
            (Actual line1 i1 v2))
           (Assign v1 v2 line1)))
(rule (=> (and 
            (Calls o1 line1)
            (Formal o1 i1 v1)
            (Actual line1 i1 v2))
           (Read1 v2 line1)))
(rule (=> (and 
            (Calls o1 line1)
            (Formal o1 i1 v1)
            (Actual line1 i1 v2))
           (Write1 v1 line1)))
(rule (=> (and
            (Calls o1 line1)
            (MethodRet o1 v1)
            (CallRet line1 v2))
           (Assign v2 v1 line1)))
(rule (=> (and
            (Calls o1 line1)
            (MethodRet o1 v1)
            (CallRet line1 v2))
           (Read1 v1 line1)))
(rule (=> (and
            (Calls o1 line1)
            (MethodRet o1 v1)
            (CallRet line1 v2))
           (Write1 v2 line1)))

;;; data-dep ;;;
;; Write1 - Read1
(rule (=> (and
            (Write1 v1 line1)
            (Read1 v1 line2))
           (data-dep line1 line2)))
;; Write1 - Read2
(rule (=> (and
            (Write1 v1 line1)
            (Read2 v1 f1 line2))
           (data-dep line1 line2)))
;; Write2 - Read1
(rule (=> (and
            (Write2 v1 f1 line1)
            (Read1 v2 line2)
            (PtsTo v1 o1)
            (PtsTo v2 o1))
           (data-dep line1 line2)))
;; Write2 - Read2 case1 (same name)
(rule (=> (and
            (Write2 v1 f1 line1)
            (Read2 v1 f1 line2))
           (data-dep line1 line2)))
;; Write2 - Read2 case2 (same pointer with same name field)
(rule (=> (and
            (Write2 v1 f1 line1)
            (Read2 v2 f1 line2)
            (PtsTo v1 o1)
            (PtsTo v2 o2))
           (data-dep line1 line2)))
;; transitive
(rule (=> (and
            (data-dep line1 line2)
            (data-dep line2 line3))
           (data-dep line1 line3)))

;;; stmt-dep ;;;
;(rule (=> (data-dep line1 line2) (stmt-dep line1 line2)))
(rule (=> (control-dep line1 line2) (stmt-dep line1 line2)))
(rule (=> (and
            (stmt-dep line1 line2)
            (stmt-dep line2 line3))
           (stmt-dep line1 line3)))

;;; call-dep ;;;
(rule (=> (and
            (Calls o1 line1)
            (Stmt line1 o2))
           (call-dep o2 o1)))
(rule (=> (and
            (call-dep o1 o2)
            (call-dep o2 o3))
           (call-dep o1 o3)))

;;; dom-data-dep ;;;
(rule (=> (and 
            (dom-install v1 event1 v2 line1)
            (PtsTo v1 o1)
            (Dom v3 o1)
            (PtsTo v2 o2)
            (dom-install v4 event2 v5 line2)
            (PtsTo v4 o3)
            (Dom v6 o3)
            (PtsTo v5 o4)
            (data-dep line3 line4)
            (Stmt line3 o2)
            (Stmt line4 o4))
           (dom-data-dep v3 event1 v6 event2)))

;;; dom-install-dep ;;;
(rule (=> (and
            (dom-install v1 event1 v2 line1)
            (PtsTo v1 o1)
            (Dom v3 o1)
            (PtsTo v2 o2)
            (dom-install v4 event2 v5 line2)
            (PtsTo v4 o3)
            (Dom v6 o3)
            (PtsTo v5 o4)
            (Stmt line2 o2))
           (dom-install-dep v3 event1 v6 event2)))

;;; dom-dep ;;;
(rule (=> (dom-data-dep v1 event1 v2 event2) (dom-dep v1 event1 v2 event2)))
(rule (=> (dom-install-dep v1 event1 v2 event2) (dom-dep v1 event1 v2 event2)))

;;;;;; Begin Facts ;;;;;;

